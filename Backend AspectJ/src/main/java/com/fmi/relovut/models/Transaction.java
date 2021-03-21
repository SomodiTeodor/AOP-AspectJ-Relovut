package com.fmi.relovut.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    public Long getId() {
    	return id;
    }
    
    public Transaction setId(Long id) {
    	this.id = id;
    	return this;
    }

    @NotNull
    private Double amount;
    
    public Double getAmount() {
    	return amount;
    }
    
    public Transaction setAmount(Double amount) {
    	this.amount = amount;
    	return this;
    }

    @NotNull
    private Double rate;
    
    public Double getRate() {
    	return rate;
    }
    
    public Transaction setRate(Double rate) {
    	this.rate = rate;
    	return this;
    }

    @NotNull
    private Date date;
    
    public Date getDate() {
    	return date;
    }
    
    public Transaction setDate(Date date) {
    	this.date = date;
    	return this;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "from_account_id")
    private Account fromAccount;
    
    public Account getFromAccount() {
    	return fromAccount;
    }
    
    public Transaction setFromAccount(Account fromAccount) {
    	this.fromAccount = fromAccount;
    	return this;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "to_account_id")
    private Account toAccount;
    
    public Account getToAccount() {
    	return toAccount;
    }
    
    public Transaction setToAccount(Account toAccount) {
    	this.toAccount = toAccount;
    	return this;
    }

    @Version
    @Column(name = "version", columnDefinition = "integer DEFAULT 0", nullable = false)
    private Long version = 0L;
    
    public Long getVersion() {
    	return version;
    }
    
    protected Transaction setVersion(Long version) {
    	this.version = version;
    	return this;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", amount=" + amount +
                ", rate=" + rate +
                ", date=" + date +
                ", fromAccount=" + fromAccount.getId() +
                ", toAccount=" + toAccount.getId() +
                ", version=" + version +
                '}';
    }
}
