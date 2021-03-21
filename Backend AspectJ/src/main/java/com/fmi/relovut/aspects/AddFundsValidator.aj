package com.fmi.relovut.aspects;

import com.fmi.relovut.dto.transactions.*;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public aspect AddFundsValidator {
	before(Double newValue): set(Double AddFundsDto.amount) && args(newValue){
		if (newValue <= 0.0d) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST ,"From aspect: Amount cannot be less than or equal to 0!");
		}
	}
}
