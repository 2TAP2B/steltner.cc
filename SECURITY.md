# Security Configuration Guide

## ⚠️ Critical Security Issues Fixed

### 1. Password Security
- **REMOVED**: Hardcoded password from `contact.ts`
- **ADDED**: Environment variable validation
- **ADDED**: Proper error handling for missing credentials

### 2. SMTP Configuration
- **FIXED**: Port 465 now properly uses `secure: true`
- **IMPROVED**: Dynamic port/security configuration
- **ADDED**: Better error messages for debugging

## 🔐 Secure Setup Steps

### Step 1: Create Environment File
```bash
cp .env.example .env
```

### Step 2: Configure SMTP Credentials
Edit `.env` with your actual mailcow settings:

```env
SMTP_HOST=steltner.cc
SMTP_PORT=587
SMTP_USER=contact@steltner.cc
SMTP_PASS=your-actual-password
```

### Step 3: Test Configuration
```bash
npm run test-smtp
```

## 🔍 Common SMTP Issues & Solutions

### Issue: Authentication Failed
**Symptoms**: Error code `EAUTH`
**Solutions**:
1. Verify username/password in mailcow admin
2. Check if SMTP is enabled for the account
3. Ensure no special characters in password are causing issues

### Issue: Connection Refused
**Symptoms**: Error code `ECONNREFUSED`
**Solutions**:
1. Try different SMTP hosts:
   - `steltner.cc`
   - `mail.steltner.cc`
   - `smtp.steltner.cc`
2. Check firewall settings
3. Verify port (587 or 465)

### Issue: Connection Timeout
**Symptoms**: Error code `ETIMEDOUT`
**Solutions**:
1. Check if your server can reach the mail server
2. Try different ports (587, 465, 25)
3. Check if ISP blocks SMTP ports

## 🛡️ Security Best Practices

### Environment Variables
- ✅ Never commit `.env` files to git
- ✅ Use strong, unique passwords
- ✅ Rotate credentials regularly
- ✅ Use different credentials for different environments

### Production Deployment
- ✅ Set environment variables on your server
- ✅ Restrict file permissions on `.env`
- ✅ Use process managers (PM2, systemd)
- ✅ Monitor for failed email attempts

### Mailcow Configuration
- ✅ Enable SMTP authentication
- ✅ Use strong passwords
- ✅ Configure rate limiting
- ✅ Enable logging for debugging

## 🔧 Troubleshooting Commands

### Test SMTP Connection
```bash
npm run test-smtp
```

### Check Environment Variables
```bash
node -e "console.log(process.env.SMTP_USER)"
```

### Debug Email Sending
Check server logs for detailed error messages when the contact form is submitted.

## 📋 Mailcow Admin Checklist

1. **Create dedicated email account** for contact forms
2. **Enable SMTP** for the account
3. **Configure rate limiting** to prevent abuse
4. **Set up proper SPF/DKIM** records
5. **Test email delivery** to your main inbox

## 🚨 Security Monitoring

Monitor your logs for:
- Failed authentication attempts
- Unusual email volumes
- Error patterns
- Successful form submissions

The contact form now logs all submissions (even failed ones) so you can manually follow up if needed.
