package com.fmi.relovut.dto.transactions;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AddFundsDto {
    @NotNull
    public Double amount;

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}
}
