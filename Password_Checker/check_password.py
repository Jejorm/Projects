from requests import get
from hashlib import sha1
import sys
import os


def request_api_data(query_char):

	url = f"https://api.pwnedpasswords.com/range/{str(query_char)}"
	response = get(url)

	if response.status_code != 200:
		raise RuntimeError(f"Error fetching: {response.status_code}, check API and try again!")

	return response


def get_password_leaks_count(hashes, hash_to_check):

	hashes = (line.split(":") for line in hashes.text.splitlines())

	for h, count in hashes:
		if h == hash_to_check:
			return count

	return


def pwned_api_check(password):

	sha1password = sha1(str(password).encode("utf-8")).hexdigest().upper()
	first5_char, tail = sha1password[:5], sha1password[5:]

	response = request_api_data(first5_char)

	return get_password_leaks_count(response, tail)


def get_passwords_from_file(file_input):

	with open(file_input, "r") as file:
		content = file.read()

	passwords = (line for line in content.splitlines())

	password_list_cleaned = list(filter(lambda item: item, passwords))

	return password_list_cleaned


def main(file):

	if os.path.exists(file) and os.path.splitext(file)[1] == ".txt":
		passwords = get_passwords_from_file(file)		
	else:
		print("\nPlease enter an existing .txt file\n")
		sys.exit()

	for password in passwords:
		count = pwned_api_check(password)

		if count:
			print(f"\n\n{password} was found {count} times... you should probably change your password\n")
		else:
			print(f"\n\n{password} was NOT found. Carry on!\n")
		

if __name__ == '__main__':
	# main(sys.exit(sys.argv[1:]))
	main(sys.argv[1])