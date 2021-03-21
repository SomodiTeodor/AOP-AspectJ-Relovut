package com.fmi.relovut.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "conversion_rates")
public class ConversionRate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    public Long getId() {
    	return this.id;
    }
    
    public ConversionRate setId(Long id) {
    	this.id = id;
    	return this;
    }

    @NotNull
    private Double rate;

    public Double getRate() {
    	return rate;
    }
    
    public ConversionRate setRate(Double rate) {
    	this.rate = rate;
    	return this;
    }
    
    @NotNull
    private Date date;
    
    public Date getDate() {
		return date;
	}

	public ConversionRate setDate(Date date) {
		this.date = date;
		return this;
	}

    @ManyToOne(optional = false)
    @JoinColumn(name = "from_currency_id")
    private Currency fromCurrency;
    
    public Currency getFromCurrency() {
		return fromCurrency;
	}

	public ConversionRate setFromCurrency(Currency fromCurrency) {
		this.fromCurrency = fromCurrency;
		return this;
	}

    @ManyToOne(optional = false)
    @JoinColumn(name = "to_currency_id")
    private Currency toCurrency;
    
    public Currency getToCurrency() {
		return toCurrency;
	}

	public ConversionRate setToCurrency(Currency toCurrency) {
		this.toCurrency = toCurrency;
		return this;
	}

    @Version
    @Column(name = "version", columnDefinition = "integer DEFAULT 0", nullable = false)
    private Long version = 0L;

	public Long getVersion() {
		return version;
	}
	
	protected ConversionRate setVersion(Long version) {
		this.version = version;
		return this;
	}
}
