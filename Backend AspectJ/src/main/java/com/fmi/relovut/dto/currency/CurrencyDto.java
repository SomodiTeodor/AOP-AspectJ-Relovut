package com.fmi.relovut.dto.currency;

import com.fmi.relovut.models.Currency;

public class CurrencyDto {
    public CurrencyDto(Currency currency) {
        this.isoName = currency.getIsoName();
    }

    private final String isoName;

	public String getIsoName() {
		return isoName;
	}
}
