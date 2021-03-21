package com.fmi.relovut.aspects;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public aspect ControllerExceptionInterceptor {
	pointcut controllerMethod(): execution (* com.fmi.relovut.controllers..*(..));

	after() throwing(Exception ex): controllerMethod() {
		if (!(ex instanceof ResponseStatusException)) {
			System.out.println(thisJoinPoint.getSignature() + " has thrown an exception with the message: " + ex.getMessage());
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
		}
	}
}
