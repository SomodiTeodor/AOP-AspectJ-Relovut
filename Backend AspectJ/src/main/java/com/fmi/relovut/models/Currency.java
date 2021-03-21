package com.fmi.relovut.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "currencies", uniqueConstraints = {@UniqueConstraint(columnNames = "iso_name")})
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    public Long getId() {
    	return id;
    }
    
    public Currency setId(Long id) {
    	this.id = id;
    	return this;
    }

    @NotNull
    private String name;
    
    public String getName() {
    	return name;
    }
    
    public Currency setName(String name) {
    	this.name = name;
    	return this;
    }

    @NotNull
    @Column(name = "iso_name")
    private String isoName;
    
    public String getIsoName() {
    	return isoName;
    }
    
    public Currency setIsoName(String isoName) {
    	this.isoName = isoName;
    	return this;
    }

    @OneToMany(mappedBy = "currency")
    private List<Account> accounts = new ArrayList<>();
    
    public List<Account> getAccounts() {
    	return accounts;
    }
    
    public Currency setAccounts(List<Account> accounts) {
    	this.accounts = accounts;
    	return this;
    }

    @OneToMany(mappedBy = "fromCurrency")
    private List<ConversionRate> conversionRatesFromCurrency = new ArrayList<>();
    
    public List<ConversionRate> getConversionRatesFromCurrency() {
    	return this.conversionRatesFromCurrency;
    }
    
    public Currency setConversionRatesFromCurrency(List<ConversionRate> conversionRatesFromCurrency) {
    	this.conversionRatesFromCurrency = conversionRatesFromCurrency;
    	return this;
    }

    @OneToMany(mappedBy = "toCurrency")
    private List<ConversionRate> conversionRatesToCurrency = new ArrayList<>();
    
    public List<ConversionRate> getConversionRatesToCurrency() {
    	return this.conversionRatesToCurrency;
    }
    
    public Currency setConversionRatesToCurrency(List<ConversionRate> conversionRatesToCurrency) {
    	this.conversionRatesToCurrency = conversionRatesToCurrency;
    	return this;
    }

    @Version
    @Column(name = "version", columnDefinition = "integer DEFAULT 0", nullable = false)
    private Long version = 0L;
    
    public Long getVersion() {
    	return version;
    }
    
    protected Currency setVersion(Long version) {
    	this.version = version;
    	return this;
    }

    @Override
    public String toString() {
        return "Currency{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isoName='" + isoName + '\'' +
                ", version=" + version +
                '}';
    }
}
