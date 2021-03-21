package com.fmi.relovut.dto.transactions;

import com.fmi.relovut.models.AddFundsTransaction;

import java.util.Date;

public class AddFundsTransactionDto {
    public AddFundsTransactionDto(AddFundsTransaction transaction) {
        this.amount = transaction.getAmount();
        this.date = transaction.getDate();
    }

    private final Double amount;
    private final Date date;
    
	public Double getAmount() {
		return amount;
	}
	public Date getDate() {
		return date;
	}
}
