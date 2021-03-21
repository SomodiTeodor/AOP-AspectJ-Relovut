package com.fmi.relovut.dto.transactions;

import java.util.UUID;

public class CreateTransactionDto {
    public UUID toAccountId;
    public Double amount;
    
	public UUID getToAccountId() {
		return toAccountId;
	}
	public void setToAccountId(UUID toAccountId) {
		this.toAccountId = toAccountId;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
    
    
}
