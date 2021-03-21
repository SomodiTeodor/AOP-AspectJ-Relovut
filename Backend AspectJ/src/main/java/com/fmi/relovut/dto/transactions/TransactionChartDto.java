package com.fmi.relovut.dto.transactions;

import com.fmi.relovut.models.Transaction;

import java.util.Date;

public class TransactionChartDto {

    public TransactionChartDto() {
		super();
	}
	private Double amount;
    private int date;
    
	public Double getAmount() {
		return amount;
	}
	public TransactionChartDto setAmount(Double amount) {
		this.amount = amount;
		return this;
	}
	public int getDate() {
		return date;
	}
	public TransactionChartDto setDate(int date) {
		this.date = date;
		return this;
	}
}
