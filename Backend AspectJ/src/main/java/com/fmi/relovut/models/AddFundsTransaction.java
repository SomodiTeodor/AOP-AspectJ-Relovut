package com.fmi.relovut.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "add_funds_transactions")
public class AddFundsTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    public Long getId() {
		return id;
	}

	public AddFundsTransaction setId(Long id) {
		this.id = id;
		return this;
	}

    @NotNull
    private Double amount;
    
    public Double getAmount() {
		return amount;
	}

	public AddFundsTransaction setAmount(Double amount) {
		this.amount = amount;
		return this;
	}

    @NotNull
    private Date date;
    
    public Date getDate() {
		return date;
	}

	public AddFundsTransaction setDate(Date date) {
		this.date = date;
		return this;
	}

    @ManyToOne(optional = false)
    @JoinColumn(name = "account_id")
    private Account account;
    
    public Account getAccount() {
		return account;
	}

	public AddFundsTransaction setAccount(Account account) {
		this.account = account;
		return this;
	}

    @Version
    @Column(name = "version", columnDefinition = "integer DEFAULT 0", nullable = false)
    private Long version = 0L;

	public Long getVersion() {
		return version;
	}

	protected AddFundsTransaction setVersion(Long version) {
		this.version = version;
		return this;
	}
}
