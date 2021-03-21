package com.fmi.relovut.dto.user;

import com.fmi.relovut.dto.account.AccountDto;
import com.fmi.relovut.models.User;

public class UserDto {
    public UserDto(User user) {
        this.email = user.getEmail();
        this.fullname = user.getFullname();
        this.account = new AccountDto(user.getAccount());
    }

    private final String email;
    private final String fullname;
    private final AccountDto account;
    
	public String getEmail() {
		return email;
	}
	public String getFullname() {
		return fullname;
	}
	public AccountDto getAccount() {
		return account;
	}
}
