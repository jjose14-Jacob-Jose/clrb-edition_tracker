package org.clrb.editiontracker.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EditionTrackerLogger {
    private static final Logger logger = LoggerFactory.getLogger(EditionTrackerLogger.class);

    public static void logInfo(String message) {
        logger.info(message);
    }

    public static void logError(String message, Throwable throwable) {
        logger.error(message, throwable);
    }
}
