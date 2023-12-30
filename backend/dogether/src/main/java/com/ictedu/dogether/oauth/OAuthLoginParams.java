package com.ictedu.dogether.oauth;

import org.springframework.util.MultiValueMap;

public interface OAuthLoginParams {
    MultiValueMap<String, String> makeBody();
}
