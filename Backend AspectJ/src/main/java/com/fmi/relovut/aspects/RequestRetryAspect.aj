package com.fmi.relovut.aspects;

import org.springframework.web.client.RestClientException;

public aspect RequestRetryAspect {
	private final int maximumRetryCount = 4;
	
	Object around(String url): call(* getForObject(String, ..) throws RestClientException) && args(url, ..) {
		int retryCount = 0;
		while (true) {
			try {
				return proceed(url);
			} catch (RestClientException ex) {
				if (retryCount < maximumRetryCount) {
					retryCount++;
					long timeToSleep = ((long)Math.pow(2, retryCount)) * 100;
					System.out.println("Call to " + url + " failed!");
					System.out.println("Attempt #" + retryCount + " - Backing off for " + timeToSleep + "msec and retrying call to " + url);
					try {
						Thread.sleep(timeToSleep);
					} catch (InterruptedException e) {
					}
					continue;
				}
				
				System.out.println("Failed to send request to " + url + ". Failing gracefully...\n");
				return null;
			}
		}
	}
}
