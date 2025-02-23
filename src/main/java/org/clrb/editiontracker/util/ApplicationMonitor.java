package org.clrb.editiontracker.util;

import org.springframework.http.HttpStatus;

import java.io.DataOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.logging.Logger;

public class ApplicationMonitor {

    private static final String URL_APPLICATION_MONITOR_PRODUCTION = "https://applicationmonitor.azurewebsites.net/apiCall/save";
    private static final String URL_APPLICATION_MONITOR = URL_APPLICATION_MONITOR_PRODUCTION;
    private static final String URL_REQUEST_TYPE = "POST";
    private static final String JSON_KEY_CALLER_MESSAGE = "callerMessage";
    private static final String JSON_KEY_CALLER_NAME = "callerName";

    private static final int HTTP_STATUS_CODE_SUCCESS_INT = HttpStatus.OK.value();

    public static void usageLog (String message, String name)  {
        Logger logger = Logger.getLogger(ApplicationMonitor.class.getName());

        try {
            logger.info("Logging message: " + message + " from: " + name);
            URL url = new URL(URL_APPLICATION_MONITOR);
            HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
            httpURLConnection.setRequestMethod(URL_REQUEST_TYPE);
            httpURLConnection.setRequestProperty("Content-Type", "application/json");
            httpURLConnection.setDoOutput(true);
            String jsonString = "{" +
                    "\"" + JSON_KEY_CALLER_MESSAGE + "\": \"" + message + "\", " +
                    "\"" + JSON_KEY_CALLER_NAME + "\": \"" + name + "\"" +
                    "}";
            try (DataOutputStream out = new DataOutputStream(httpURLConnection.getOutputStream())) {
                out.writeBytes(jsonString);
                out.flush();
            } catch (Exception exception) {
                logger.severe("Could not write to application monitor: " + exception.getMessage());
            }
            httpURLConnection.disconnect();
            int responseCode = httpURLConnection.getResponseCode();

            if (responseCode == HTTP_STATUS_CODE_SUCCESS_INT)
                logger.info("Logging successful. Response code: " + responseCode);
            else
                logger.warning("Logging failed in 'Application Monitor' server. Response code: " + responseCode);


        } catch (Exception exception) {
            logger.severe("Logging to ApplicationMonitor failed. Exception: " + exception);
        }
    }

}
