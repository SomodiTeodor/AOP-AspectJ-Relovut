package com.fmi.relovut.aspects;

import java.lang.reflect.Method;
import java.util.Calendar;
import java.util.HashMap;

import org.aspectj.lang.reflect.MethodSignature;

import com.fmi.relovut.annotations.CacheableRequest;

public aspect CahceableRequest {
	private static HashMap<String, Response> _cache = new HashMap<String, Response>();
	
	pointcut cacheableRequest(): execution(@CacheableRequest * com.fmi.relovut.controllers..*(..));
	
	Object around(): cacheableRequest() {
		Response response;
		Calendar now = Calendar.getInstance();
		MethodSignature signature = (MethodSignature)thisJoinPoint.getSignature();
		
		// Check cache for existing valid response
		String key = signature.toString();
		if (_cache.containsKey(key)) {
			response = _cache.get(key);
			if (now.before(response.validUntil)) {
				return response.response;
			} else {
				_cache.remove(key);
			}
		}
		
		// Get @CacheableRequest annotation value
		Method method = signature.getMethod();
		CacheableRequest annotation = method.getAnnotation(CacheableRequest.class);
		
		//Annotation[] annotation = thisJoinPoint.getTarget().getClass().getMethod(method.getName(), method.getParameterTypes()).getAnnotations();
		if (annotation == null) {
			return proceed();
		}
		
		int secondsUntilExpiry = annotation.SecondsUntilExpiry();
		now.add(Calendar.SECOND, secondsUntilExpiry);
		Object result = proceed();
		
		// Let request execute, then save the result in cache
		response = new Response(now, result);
		_cache.put(key, response);
		return result;
	}
	
	private class Response {
		public Response(Calendar validUntil, Object response) {
			this.validUntil = validUntil;
			this.response = response;
		}
		
		public Calendar validUntil;
		public Object response;
	}
}
