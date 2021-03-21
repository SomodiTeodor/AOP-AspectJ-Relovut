package com.fmi.relovut.dto.user;

import com.fmi.relovut.models.User;

public class FriendDto {
    public FriendDto(User user) {
        this.accountId = user.getAccount().getId().toString();
        this.email = user.getEmail();
        this.fullname = user.getFullname();
    }

    private final String accountId;
    private final String email;
    private final String fullname;
    
	public String getAccountId() {
		return accountId;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getFullname() {
		return fullname;
	}
}
