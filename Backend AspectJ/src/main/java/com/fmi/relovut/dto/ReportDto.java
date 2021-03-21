package com.fmi.relovut.dto;

public class ReportDto {
	public ReportDto() {
		
	}
	
    public ReportDto(String fromDate, String toDate) {
		super();
		this.fromDate = fromDate;
		this.toDate = toDate;
	}
	String fromDate;
    String toDate;
    
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
}
