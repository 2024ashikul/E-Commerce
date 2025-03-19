from authlib.integrations.flask_client import OAuth
import os
oauth = OAuth()

def configure_oauth(app):
    oauth.init_app(app)

    oauth.register(
        name="google",
        client_id=os.getenv('client_id'),
        client_secret=os.getenv('client_secret'),
        authorize_url="https://accounts.google.com/o/oauth2/auth",
        access_token_url="https://oauth2.googleapis.com/token",
        userinfo_endpoint="https://openidconnect.googleapis.com/v1/userinfo",
        client_kwargs={"scope": "openid email profile"},
        jwks_uri="https://www.googleapis.com/oauth2/v3/certs" 
        )
