package com.fmi.relovut.models;

import com.fmi.relovut.helpers.GeneralHelper;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @Column(name = "id", length = 16, unique = true, nullable = false)
    private UUID id = UUID.randomUUID();
    
    public UUID getId() {
		return id;
	}

	public Account setId(UUID id) {
		this.id = id;
		return this;
	}

    @NotNull
    private Double amount;
    
    public Double getAmount() {
		return amount;
	}
	
	public Account setAmount(Double amount) {
        this.amount = GeneralHelper.round(amount, 4);
        return this;
    }

    @OneToOne(optional = false, cascade = {CascadeType.ALL})
    @JoinColumn(name = "user_id")
    private User user;
    
    public User getUser() {
		return user;
	}

	public Account setUser(User user) {
		this.user = user;
		return this;
	}

    @OneToMany(mappedBy = "account")
    private Set<AddFundsTransaction> addFundsTransactions = new HashSet<>();
    
    public Set<AddFundsTransaction> getAddFundsTransactions() {
		return addFundsTransactions;
	}

	public Account setAddFundsTransactions(Set<AddFundsTransaction> addFundsTransactions) {
		this.addFundsTransactions = addFundsTransactions;
		return this;
	}

    @OneToMany(mappedBy = "fromAccount")
    private Set<Transaction> outgoingTransactions = new HashSet<>();

    public Set<Transaction> getOutgoingTransactions() {
		return outgoingTransactions;
	}

	public Account setOutgoingTransactions(Set<Transaction> outgoingTransactions) {
		this.outgoingTransactions = outgoingTransactions;
		return this;
	}

    @OneToMany(mappedBy = "toAccount")
    private Set<Transaction> incomingTransactions = new HashSet<>();
    
    public Set<Transaction> getIncomingTransactions() {
		return incomingTransactions;
	}

	public Account setIncomingTransactions(Set<Transaction> incomingTransactions) {
		this.incomingTransactions = incomingTransactions;
		return this;
	}

    @ManyToOne(optional = false)
    @JoinColumn(name = "currency_id")
    private Currency currency;
    
    public Currency getCurrency() {
		return currency;
	}

	public Account setCurrency(Currency currency) {
		this.currency = currency;
		return this;
	}

    @Version
    @Column(name = "version", columnDefinition = "integer DEFAULT 0", nullable = false)
    private Long version = 0L;
    
    public Long getVersion() {
		return version;
	}

	protected Account setVersion(Long version) {
		this.version = version;
		return this;
	}

    

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) return false;
        if (!(obj instanceof Account))
            return false;
        if (obj == this)
            return true;
        return this.getId().equals(((Account) obj).getId());
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", amount=" + amount +
                ", user=" + user.getId() +
                ", currency=" + currency +
                ", version=" + version +
                '}';
    }
}
