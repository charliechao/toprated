#!/usr/bin/env python3
"""Send TopRated.nz email through Gmail SMTP using the verified info@ alias.

Required environment variables:
  TOPRATED_SMTP_USER      Gmail login account, usually yeahcharlie@gmail.com
  TOPRATED_SMTP_PASSWORD  Gmail app password or SMTP password

Example:
  $env:TOPRATED_SMTP_USER="yeahcharlie@gmail.com"
  $env:TOPRATED_SMTP_PASSWORD="xxxx xxxx xxxx xxxx"
  python scripts/send_toprated_email.py --to lancegunn@me.com --subject "Re: New Business Listing Request" --body-file email.txt
"""

from __future__ import annotations

import argparse
import os
import smtplib
import ssl
import sys
from email.message import EmailMessage


DEFAULT_FROM = "info@toprated.nz"
DEFAULT_SMTP_HOST = "smtp.gmail.com"
DEFAULT_SMTP_PORT = 465


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Send a TopRated.nz email via Gmail SMTP.")
    parser.add_argument("--to", required=True, help="Recipient email address.")
    parser.add_argument("--subject", required=True, help="Email subject.")
    parser.add_argument("--body-file", required=True, help="Path to a plain-text email body file.")
    parser.add_argument("--from-email", default=DEFAULT_FROM, help=f"Sender address. Defaults to {DEFAULT_FROM}.")
    parser.add_argument("--reply-to", default=DEFAULT_FROM, help=f"Reply-To address. Defaults to {DEFAULT_FROM}.")
    parser.add_argument("--smtp-host", default=DEFAULT_SMTP_HOST, help="SMTP host.")
    parser.add_argument("--smtp-port", type=int, default=DEFAULT_SMTP_PORT, help="SMTP SSL port.")
    parser.add_argument("--dry-run", action="store_true", help="Print the message summary without sending.")
    return parser


def main() -> int:
    args = build_parser().parse_args()

    smtp_user = os.environ.get("TOPRATED_SMTP_USER")
    smtp_password = os.environ.get("TOPRATED_SMTP_PASSWORD")

    if not smtp_user or not smtp_password:
        print(
            "Missing TOPRATED_SMTP_USER or TOPRATED_SMTP_PASSWORD. "
            "Set them as environment variables before sending.",
            file=sys.stderr,
        )
        return 2

    if args.from_email.lower() != DEFAULT_FROM:
        print(
            f"Refusing to send TopRated email from {args.from_email}. "
            f"Use the verified sender {DEFAULT_FROM}.",
            file=sys.stderr,
        )
        return 2

    with open(args.body_file, "r", encoding="utf-8-sig") as body_handle:
        body = body_handle.read()

    message = EmailMessage()
    message["From"] = f"TopRated.nz <{args.from_email}>"
    message["To"] = args.to
    message["Reply-To"] = args.reply_to
    message["Subject"] = args.subject
    message.set_content(body)

    if args.dry_run:
        print(f"From: {message['From']}")
        print(f"To: {message['To']}")
        print(f"Reply-To: {message['Reply-To']}")
        print(f"Subject: {message['Subject']}")
        print("\n" + body)
        return 0

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(args.smtp_host, args.smtp_port, context=context) as server:
        server.login(smtp_user, smtp_password)
        server.send_message(message)

    print(f"Sent email to {args.to} from {args.from_email}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
