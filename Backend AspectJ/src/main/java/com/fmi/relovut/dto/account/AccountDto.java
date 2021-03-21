package com.fmi.relovut.dto.account;

import com.fmi.relovut.dto.currency.CurrencyDto;
import com.fmi.relovut.models.Account;

public class AccountDto {
    public AccountDto(Account account) {
        this.id = account.getId().toString();
        this.currency = new CurrencyDto(account.getCurrency());
    }

    private final String id;
    private final CurrencyDto currency;
    
	public String getId() {
		return id;
	}
	public CurrencyDto getCurrency() {
		return currency;
	}
    
    
}
