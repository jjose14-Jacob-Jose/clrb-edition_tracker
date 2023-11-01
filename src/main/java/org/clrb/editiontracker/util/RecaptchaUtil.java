package org.clrb.editiontracker.util;

import org.clrb.editiontracker.constants.EditionConstants;
import org.clrb.editiontracker.model.GoogleReCaptchaResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


public class RecaptchaUtil {

    /**
     * Method to validate Google reCaptcha.
     * @param userResponse: Google reCaptcha token from Google.
     * @return: MainConstants.FLAG_SUCCESS: If human users; MainConstants.FLAG_FAILURE: if a bot. 
     */
    public static boolean validateRecaptcha(String userResponse) {

        if(EditionConstants.KEY_GOOGLE_RECAPTCHA_SERVER.equalsIgnoreCase(EditionConstants.KEY_FOR_LOCALHOST)) {
//            If running on localhost, do not validate Google reCaptcha.
            return EditionConstants.FLAG_SUCCESS;
        }

        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
            map.add("secret", EditionConstants.KEY_GOOGLE_RECAPTCHA_SERVER);
            map.add("response", userResponse);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

            ResponseEntity<GoogleReCaptchaResponse> reCaptchaApiResponse = restTemplate.postForEntity(EditionConstants.URL_GOOGLE_RECAPTCHA_VERIFICATION, request, GoogleReCaptchaResponse.class);

            if (reCaptchaApiResponse.getStatusCode().is2xxSuccessful() && reCaptchaApiResponse.getBody().isSuccess()) {
                EditionTrackerLogger.logInfo("Validated Google reCaptcha Token");
                return EditionConstants.FLAG_SUCCESS;
            }
        } catch (Exception exception) {
            EditionTrackerLogger.logError("Error validating Google reCaptcha: "+userResponse, exception);

        }
        return EditionConstants.FLAG_FAILURE;
    }
}
