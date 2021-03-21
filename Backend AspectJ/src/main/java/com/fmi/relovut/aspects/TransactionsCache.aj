package com.fmi.relovut.aspects;

import org.springframework.web.bind.annotation.GetMapping;

import com.fmi.relovut.dto.transactions.CreateTransactionDto;

import java.security.Principal;
import java.util.HashMap;
import java.util.Optional;

import com.fmi.relovut.controllers.TransactionController;
import com.fmi.relovut.models.*;

privileged public aspect TransactionsCache {
	
	private static HashMap<String, Object> _cache = new HashMap<String, Object>();

	Object around(Principal principal): execution (@GetMapping * com.fmi.relovut.controllers.TransactionController.*(Principal, ..)) 
		&& args(principal, ..) {
		String methodName = thisJoinPoint.getSignature().getName();
		String key = principal.getName() + "-" + methodName;
		
		if (_cache.containsKey(key)) {
			return _cache.get(key);
		}
		
		Object result = proceed(principal);
		_cache.put(key, result);
		return result;
	}
	
	Object around(Principal principal): execution (!@GetMapping * com.fmi.relovut.controllers.TransactionController.*(Principal, ..)) 
		&& args(principal, ..) {
		Object result = proceed(principal);
		_cache.keySet().removeIf(k -> k.startsWith(principal.getName() + "-"));
		return result;
	}
	
	Object around(CreateTransactionDto dto, TransactionController controller): execution (!@GetMapping * com.fmi.relovut.controllers.TransactionController.*(Principal, CreateTransactionDto)) 
		&& args(Principal, dto) 
		&& this(controller) {
		
		// Execute
		Object result = proceed(dto, controller);
		
		// Afterwards, get destination account for the transaction
		Optional<Account> destinationAccount = controller.transactionService.accountRepository.findById(dto.getToAccountId());
		if (destinationAccount.isPresent()) {
			// Get that user's email
			String email = destinationAccount.get().getUser().getEmail();
			//System.out.println("Invalidating cache for destination user with email: " + email);
			_cache.keySet().removeIf(k -> k.startsWith(email + "-"));
		}
		
		return result;
	}
}
