package org.clrb.editiontracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GoogleReCaptchaResponse {
    private boolean success;
    private String challenge_ts;
    private String hostname;
    private List<String> errorCodes;

}
