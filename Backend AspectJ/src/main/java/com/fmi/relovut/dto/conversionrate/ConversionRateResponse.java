package com.fmi.relovut.dto.conversionrate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ConversionRateResponse {
    public JsonNode rates;
    public String base;
    public Date date;
    
	public JsonNode getRates() {
		return rates;
	}
	public void setRates(JsonNode rates) {
		this.rates = rates;
	}
	public String getBase() {
		return base;
	}
	public void setBase(String base) {
		this.base = base;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
    
}
