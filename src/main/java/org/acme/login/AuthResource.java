package org.acme.login;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

import java.io.InputStream;
import jakarta.transaction.Transactional;
import jakarta.inject.Inject;
import io.vertx.ext.web.RoutingContext;

@Path("/")
public class AuthResource {

        @GET
        @Produces(MediaType.TEXT_HTML)
        public Response mainPage() {
                String loginUser = context.session().get("loginUser");
                String htmlPath = (loginUser != null)
                                ? "META-INF/resources/login/main_after_login.html"
                                : "META-INF/resources/main_index.html";
                InputStream html = getClass().getClassLoader().getResourceAsStream(htmlPath);
                return Response.ok(html).build();
        }

        @GET
        @Path("/login")
        @Produces(MediaType.TEXT_HTML)
        public Response loginPage() {
                InputStream html = getClass()
                                .getClassLoader()
                                .getResourceAsStream("META-INF/resources/login/login.html");
                return Response.ok(html).build();
        }

        @Inject
        RoutingContext context;

        @POST
        @Path("/login_check")
        @Transactional
        @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
        public Response loginCheck(
                        @FormParam("username") String username,
                        @FormParam("password") String password) {
                User user = User.findByUsername(username);
                if (user == null || !user.password.equals(password)) {
                        return Response
                                        .seeOther(URI.create("/login?error=1"))
                                        .build();
                }
                context.session().put("loginUser", username);
                return Response
                                .seeOther(URI.create("/after_login"))
                                .build();
        }

        @GET
        @Path("/after_login")
        @Produces(MediaType.TEXT_HTML)
        public Response afterLogin() {
                String loginUser = context.session().get("loginUser");
                if (loginUser == null) {
                        return Response
                                        .seeOther(URI.create("/login"))
                                        .build();
                }
                InputStream html = getClass()
                                .getClassLoader()
                                .getResourceAsStream("META-INF/resources/login/main_after_login.html");
                return Response.ok(html).build();
        }

        @GET
        @Path("/logout")
        public Response logout(@QueryParam("next") String next) {
                context.session().destroy();
                String redirect = "login".equals(next) ? "/login" : "/";
                return Response
                                .seeOther(URI.create(redirect))
                                .build();
        }

        @GET
        @Path("/register")
        @Produces(MediaType.TEXT_HTML)
        public Response registerPage() {
                InputStream html = getClass()
                                .getClassLoader()
                                .getResourceAsStream(
                                                "META-INF/resources/login/register.html");
                return Response.ok(html).build();
        }

        @POST
        @Path("/register_check")
        @Transactional
        @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
        @Produces(MediaType.TEXT_HTML)
        public Response registerCheck(
                        @FormParam("username") String username,
                        @FormParam("password") String password,
                        @FormParam("email") String email,
                        @FormParam("phone") String phone) {
                if (User.findByUsername(username) != null) {
                        return Response
                                        .seeOther(URI.create("/register?error=duplicate_username"))
                                        .build();
                }
                if (User.findByEmail(email) != null) {
                        return Response
                                        .seeOther(URI.create("/register?error=duplicate_email"))
                                        .build();
                }
                User newUser = new User();
                newUser.username = username;
                newUser.password = password;
                newUser.email = email;
                newUser.phone = phone;
                newUser.persist();
                return Response
                                .seeOther(URI.create("/register_success"))
                                .build();
        }

        @GET
        @Path("/register_success")
        @Produces(MediaType.TEXT_HTML)
        public Response registerSuccess() {
                InputStream html = getClass()
                                .getClassLoader()
                                .getResourceAsStream(
                                                "META-INF/resources/login/register_success.html");
                return Response.ok(html).build();
        }

        @GET
        @Path("/profile")
        @Produces(MediaType.TEXT_HTML)
        public Response profilePage() {
                String loginUser = context.session().get("loginUser");
                if (loginUser == null) {
                        return Response
                                        .seeOther(URI.create("/login"))
                                        .build();
                }
                User user = User.findByUsername(loginUser);
                context.session().put("userEmail", user.email);
                context.session().put("userPhone", user.phone);
                context.session().put("profileImage",
                                user.profileImage != null ? user.profileImage : "default.png");
                InputStream html = getClass()
                                .getClassLoader()
                                .getResourceAsStream(
                                                "META-INF/resources/login/profile.html");
                return Response.ok(html).build();
        }

        @GET
        @Path("/profile/info")
        @Produces(MediaType.APPLICATION_JSON)
        public Response profileInfo() {
                String loginUser = context.session().get("loginUser");
                if (loginUser == null) {
                        return Response.status(401).build();
                }
                User user = User.findByUsername(loginUser);
                return Response.ok(
                                Map.of(
                                                "username", user.username,
                                                "email", user.email != null ? user.email : "",
                                                "phone", user.phone != null ? user.phone : "",
                                                "profileImage", user.profileImage != null
                                                                ? user.profileImage
                                                                : ""))
                                .build();
        }

        @POST
        @Path("/profile/upload")
        @Transactional
        @Consumes(MediaType.MULTIPART_FORM_DATA)
        public Response profileUpload(
                        @RestForm("profileImage") FileUpload file) {
                String loginUser = context.session().get("loginUser");
                if (loginUser == null) {
                        return Response
                                        .seeOther(URI.create("/login"))
                                        .build();
                }
                try {
                        String original = file.fileName();
                        String ext = original.substring(
                                        original.lastIndexOf('.') + 1).toLowerCase();
                        if (!ext.matches("jpg|jpeg|png|gif|webp")) {
                                return Response
                                                .seeOther(URI.create("/profile?error=invalid_type"))
                                                .build();
                        }
                        if (file.size() > 5 * 1024 * 1024) {
                                return Response
                                                .seeOther(URI.create("/profile?error=too_large"))
                                                .build();
                        }
                        String newFileName = UUID.randomUUID() + "." + ext;
                        java.nio.file.Path uploadDir = Paths.get(
                                        "src/main/resources/META-INF/resources/uploads/profile");
                        java.nio.file.Files.createDirectories(uploadDir);
                        java.nio.file.Files.copy(file.uploadedFile(),
                                        uploadDir.resolve(newFileName),
                                        java.nio.file.StandardCopyOption.REPLACE_EXISTING);
                        User user = User.findByUsername(loginUser);
                        user.profileImage = newFileName;
                        return Response
                                        .seeOther(URI.create("/profile"))
                                        .build();
                } catch (Exception e) {
                        return Response
                                        .seeOther(URI.create("/profile?error=upload_fail"))
                                        .build();
                }
        }

        @POST
        @Path("/profile/update")
        @Transactional
        @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
        public Response profileUpdate(
                        @FormParam("email") String email,
                        @FormParam("phone") String phone) {
                String loginUser = context.session().get("loginUser");
                if (loginUser == null) {
                        return Response
                                        .seeOther(URI.create("/login"))
                                        .build();
                }

                User found = User.findByEmail(email);
                if (found != null && !found.username.equals(loginUser)) {
                        return Response
                                        .seeOther(URI.create("/profile?error=duplicate_email"))
                                        .build();
                }

                User user = User.findByUsername(loginUser);
                user.email = email;
                user.phone = phone;
                return Response
                                .seeOther(URI.create("/profile?success=updated"))
                                .build();
        }

        @POST
        @Path("/profile/password")
        @Transactional
        @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
        public Response profilePassword(
                        @FormParam("currentPassword") String currentPassword,
                        @FormParam("newPassword") String newPassword) {
                String loginUser = context.session().get("loginUser");
                if (loginUser == null) {
                        return Response
                                        .seeOther(URI.create("/login"))
                                        .build();
                }

                User user = User.findByUsername(loginUser);
                if (!user.password.equals(currentPassword)) {
                        return Response
                                        .seeOther(URI.create("/profile?error=wrong_password"))
                                        .build();
                }

                user.password = newPassword;
                return Response
                                .seeOther(URI.create("/profile?success=password_changed"))
                                .build();
        }
}
