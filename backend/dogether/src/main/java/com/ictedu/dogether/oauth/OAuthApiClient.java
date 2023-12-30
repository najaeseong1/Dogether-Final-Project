package com.ictedu.dogether.oauth;

public interface OAuthApiClient {

    String requestAccessToken(OAuthLoginParams params);
    OAuthInfoResponse requestOauthInfo(String accessToken);

}
