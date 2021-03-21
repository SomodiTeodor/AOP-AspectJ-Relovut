package com.fmi.relovut.aspects;

public aspect ExecTimeTracker {
	private long startTime;
	
	pointcut controllerMethodExecute(): execution (* com.fmi.relovut.controllers..*(..));
	
	before(): controllerMethodExecute() {
		startTime = System.nanoTime();
	}
	
	after(): controllerMethodExecute() {
		long endTime = System.nanoTime();
		System.out.println("Execution time from " + thisJoinPoint.getSignature().toShortString() + ": " + (endTime - startTime) / 1000000 + " msec" );
	}
}
