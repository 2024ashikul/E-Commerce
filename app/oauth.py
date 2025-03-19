from authlib.integrations.flask_client import OAuth

oauth = OAuth()

def configure_oauth(app):
    oauth.init_app(app)

    oauth.register(
        name="google",
        client_id="970781857128-3tposd4ecqs9dogl8g9i46oiltmd7k6d.apps.googleusercontent.com",
        client_secret="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",
        authorize_url="https://accounts.google.com/o/oauth2/auth",
        access_token_url="https://oauth2.googleapis.com/token",
        userinfo_endpoint="https://openidconnect.googleapis.com/v1/userinfo",
        client_kwargs={"scope": "openid email profile"},
        jwks_uri="https://www.googleapis.com/oauth2/v3/certs" 
        )
