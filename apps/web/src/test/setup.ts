import "@testing-library/jest-dom";
import { vi } from 'vitest';

const translationMap: Record<string, Record<string, unknown>> = {
  // Travel Plans
  'dashboard.title': 'My Travel Plans',
  'dashboard.subtitle': 'Your travel itineraries, all in one place',
  'dashboard.createNew': 'New trip',
  'dashboard.noPlan': 'No travel plans yet',
  'dashboard.loading': 'Loading your trips…',
  'plans.myTrips': 'My trips',
  'plans.days': '{{count}} days',

  // Nav
  'nav.myTrips': 'My trips',
  'nav.pastTrips': 'Past trips',
  'nav.profile': 'Profile',
  'nav.contact': 'Contact',
  'nav.logOut': 'Log out',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',

  // Day Column
  'dayColumn.loading': 'Loading…',
  'dayColumn.noActivities': 'No activities yet',
  'dayColumn.dayLabel': 'Day {{dayNumber}}',
  'dayColumn.moveIncomplete': 'Move incomplete to next day',
  'dayColumn.addActivity': 'Add Activity',

  // Sharing
  'sharing.share': 'Share this plan with a friend',
  'sharing.shareTitle': 'Share Travel Plan',
  'sharing.shareSubtitle': 'Invite collaborators to this plan',
  'sharing.inviteLabel': 'Invite friend by email',
  'sharing.invitePlaceholder': 'friend@example.com',
  'sharing.sendButton': 'Send Invite',
  'sharing.sending': 'Sending...',
  'sharing.errorSendingInvite': 'There was an error sending the invitation. Try again later.',
  'sharing.inviteSentSuccess': 'The plan was shared with the friend and now the friend should confirm it via email to be able to see the plan in their account.',
  'sharing.privacyPolicyLink': 'Privacy Policy',
  'sharing.privacyNotice': "They'll receive one invite email. Their address is used only to send this invite and is stored while the invitation is pending or accepted. Privacy Policy",
  'sharing.closeButton': 'Close modal',
  'shareStatusList.accepted': '✓ Shared with {{name}}',
  'shareStatusList.pending': '⏳ Waiting for {{email}}',

  // Delete Modal
  'deleteModal.title': 'Delete this travel plan',
  'deleteModal.message': 'This will permanently delete this travel plan and all its activities. This action cannot be undone.',
  'deleteModal.cancelButton': 'No, keep it',
  'deleteModal.confirmButton': 'Yes, delete',

  // Create Plan Modal
  'createPlanModal.title': 'Plan a new trip',
  'createPlanModal.subtitle': 'Plan a new adventure',
  'createPlanModal.destinationLabel': 'Destination City',
  'createPlanModal.destinationPlaceholder': 'Where are you going?',
  'createPlanModal.startDateLabel': 'Start date',
  'createPlanModal.endDateLabel': 'End date',
  'createPlanModal.createButton': 'Create trip',
  'createPlanModal.creating': 'Creating...',
  'createPlanModal.cancel': 'Cancel',

  // Inline Edit Activity
  'inlineEditActivity.markDone': 'Mark as done',
  'inlineEditActivity.markNotDone': 'Mark as not done',
  'inlineEditActivity.editButton': 'Edit',
  'inlineEditActivity.required': 'Required',
  'inlineEditActivity.saveChanges': 'Save changes',
  'inlineEditActivity.deleteActivity': 'Delete activity',
  'inlineEditActivity.cancelButton': 'Cancel',
  'inlineEditActivity.saveButton': 'Save',
  'inlineEditActivity.noTime': 'No time',
  'inlineEditActivity.descriptionPlaceholder': "What's the plan?",
  'inlineEditActivity.errorDescriptionRequired': 'Activity description is required',

  // Past Trips
  'pastTrips.heading': 'Past trips',
  'pastTrips.subheading': 'A record of your completed adventures',
  'pastTrips.loading': 'Loading your past trips…',
  'pastTrips.noTrips': 'Your archive is empty',
  'pastTrips.noTripsDesc': 'When a trip ends, it becomes part of your travel history. Check back here to revisit memories from journeys past.',
  'pastTrips.emptyStateHint': 'Your completed adventures await',

  // Login
  'login.title': 'Welcome back',
  'login.subtitle': 'Sign in to your account to continue',
  'login.emailLabel': 'Email address',
  'login.emailPlaceholder': 'you@example.com',
  'login.passwordLabel': 'Password',
  'login.rememberMe': 'Remember me',
  'login.logIn': 'Sign in',
  'login.loggingIn': 'Logging in...',
  'login.forgotPassword': 'Forgot password?',
  'login.noAccount': "Don't have an account?",
  'login.signUp': 'Sign up',
  'login.errorInvalid': 'Invalid email or password',

  // Signup
  'signup.title': 'Create your account',
  'signup.subtitle': 'Start planning your perfect trip today',
  'signup.nameLabel': 'Full Name',
  'signup.namePlaceholder': 'John Doe',
  'signup.emailLabel': 'Email address',
  'signup.emailPlaceholder': 'you@example.com',
  'signup.passwordLabel': 'Password',
  'signup.passwordPlaceholder': 'Create a strong password',
  'signup.confirmPasswordLabel': 'Confirm password',
  'signup.confirmPasswordPlaceholder': 'Confirm your password',
  'signup.passwordRequirements': 'Password must contain:',
  'signup.minLength': 'At least 8 characters',
  'signup.hasUppercase': 'One uppercase letter',
  'signup.hasLowercase': 'One lowercase letter',
  'signup.hasNumber': 'One number',
  'signup.hasSpecialChar': 'One special character',
  'signup.signUp': 'Create account',
  'signup.signingUp': 'Creating account...',
  'signup.submittingForm': 'Submitting form, please wait',
  'signup.creatingAccount': 'Creating account…',
  'signup.accountCreated': 'Account created!',
  'signup.confirmationSent': "We've sent a confirmation email to your inbox. Click the link to activate your account.",
  'signup.agreeTerms': 'I agree to the',
  'signup.termsOfService': 'Terms of Service',
  'signup.and': 'and',
  'signup.privacyPolicy': 'Privacy Policy',
  'signup.haveAccount': 'Already have an account?',
  'signup.logIn': 'Log in',
  'signup.errorNameRequired': 'Name is required',
  'signup.errorEmailRequired': 'Email is required',
  'signup.errorEmailInvalid': 'Please enter a valid email',
  'signup.errorPasswordRequired': 'Password is required',
  'signup.errorPasswordTooShort': 'Password must be at least 8 characters',
  'signup.errorPasswordsDoNotMatch': 'Passwords do not match',

  // Forgot Password
  'forgotPassword.title': 'Reset your password',
  'forgotPassword.description': 'Enter your email address and we\'ll send you a link to reset your password.',
  'forgotPassword.emailLabel': 'Email address',
  'forgotPassword.emailPlaceholder': 'you@example.com',
  'forgotPassword.sendLink': 'Send reset link',
  'forgotPassword.sendingLink': 'Sending...',
  'forgotPassword.backToLogin': 'Back to login',

  // Reset Password
  'resetPassword.title': 'Set a new password',
  'resetPassword.subtitle': 'Enter your new password below',
  'resetPassword.newPasswordLabel': 'New password',
  'resetPassword.newPasswordPlaceholder': 'Create a new password',
  'resetPassword.confirmPasswordLabel': 'Confirm password',
  'resetPassword.confirmPasswordPlaceholder': 'Confirm your new password',
  'resetPassword.updatePassword': 'Update password',
  'resetPassword.updatingPassword': 'Updating...',
  'resetPassword.passwordUpdated': 'Password updated successfully!',
  'resetPassword.resetPassword': 'Reset password',
  'resetPassword.resettingPassword': 'Resetting password...',
  'resetPassword.verifyingLink': 'Verifying recovery link…',
  'resetPassword.linkInvalid': 'Recovery link expired or invalid. Please request a new password reset.',
  'resetPassword.passwordsDontMatch': 'Passwords do not match',
  'resetPassword.backToLogin': 'Back to login',

  // Password Input
  'passwordInput.showPassword': 'Show password',
  'passwordInput.hidePassword': 'Hide password',
  'passwordInput.passwordField': 'Password',

  // Contact
  'contact.title': 'Get in Touch',
  'contact.description': 'Have an issue? A brilliant feature idea? A complaint? We\'d love to hear from you. Send us a message and we\'ll get back to you as soon as possible.',
  'contact.responseTime': 'All messages are reviewed by our team. Expect a response within 24-48 hours.',
  'contact.nameLabel': 'Name',
  'contact.namePlaceholder': 'Your name',
  'contact.emailLabel': 'Email',
  'contact.emailPlaceholder': 'your.email@example.com',
  'contact.subjectLabel': 'Subject',
  'contact.subjectPlaceholder': 'What is this about?',
  'contact.messageLabel': 'Message',
  'contact.messagePlaceholder': 'Tell us more...',
  'contact.send': 'Send Message',
  'contact.sending': 'Sending...',
  'contact.messageSent': 'Message Sent!',
  'contact.messageSentDesc': 'Thank you for reaching out. We\'ve received your message and will get back to you soon.',
  'contact.checkEmail': 'Check your email for updates',
  'contact.thankYou': 'Thank you! We\'ll get back to you soon.',
  'contact.privacyNotice': 'By submitting this form you consent to being contacted about your inquiry. You can manage this preference in your profile.',

  // Profile
  'profile.title': 'Your profile',
  'profile.subtitle': 'Account details and settings',
  'profile.emailLabel': 'Email address',
  'profile.editProfile': 'Edit display name',
  'profile.nameLabel': 'Full Name',
  'profile.namePlaceholder': 'Your name',
  'profile.emailPlaceholderLabel': 'Email address',
  'profile.emailPlaceholder': 'your@email.com',
  'profile.countryLabel': 'Country',
  'profile.countryPlaceholder': 'Select your country',
  'profile.cityLabel': 'City',
  'profile.cityPlaceholder': 'Your city',
  'profile.avatarLabel': 'Avatar',
  'profile.save': 'Save changes',
  'profile.saving': 'Saving...',
  'profile.profileUpdated': 'Profile updated successfully!',
  'profile.updateFailed': 'Could not update profile. Please try again.',
  'profile.cancel': 'Cancel',
  'profile.errorNameRequired': 'Name is required',
  'profile.errorCountryRequired': 'Country is required',
  'profile.errorCityRequired': 'City is required',

  // Account
  'account.accountSettings': 'Account settings',
  'account.changePassword': 'Change password',
  'account.changePasswordDesc': 'Update your account password',
  'account.currentPasswordLabel': 'Current password',
  'account.currentPasswordPlaceholder': 'Enter your current password',
  'account.newPasswordLabel': 'New password',
  'account.newPasswordPlaceholder': 'Create a new password',
  'account.confirmPasswordLabel': 'Confirm password',
  'account.confirmPasswordPlaceholder': 'Confirm your new password',
  'account.updatePassword': 'Update password',
  'account.updating': 'Updating...',
  'account.passwordUpdated': 'Password updated successfully!',
  'account.passwordUpdateFailed': 'Could not update password. Please try again.',
  'account.errorCurrentPasswordRequired': 'Current password is required',
  'account.errorNewPasswordRequired': 'New password is required',
  'account.errorPasswordsDoNotMatch': 'Passwords do not match',
  'account.errorInvalidCurrentPassword': 'Current password is incorrect',

  // Danger Zone
  'dangerZone.title': 'Danger Zone',
  'dangerZone.description': 'These actions cannot be undone. Proceed with caution.',
  'dangerZone.deleteAccount': 'Delete account',
  'dangerZone.deleteAccountDescription': 'Permanently delete your account and all associated data. This action cannot be undone.',
  'dangerZone.deleteButton': 'Delete my account',
  'dangerZone.deleteConfirmTitle': 'Delete Account?',
  'dangerZone.deleteConfirmMessage': 'This will permanently delete your account and all your travel plans. This action cannot be undone. Please type your email to confirm:',
  'dangerZone.deleteConfirmButton': 'Yes, delete my account permanently',
  'dangerZone.deleteCancelButton': 'No, keep my account',
  'dangerZone.accountDeleted': 'Your account has been deleted.',
  'dangerZone.deleteAccountFailed': 'Could not delete account. Please try again.',
  'dangerZone.deleting': 'Deleting account...',
  'dangerZone.confirmationEmail': 'Please enter your email to confirm',
  'dangerZone.errorEmailMismatch': 'Email does not match. Please try again.',
  'dangerZone.deleteCannotUndo': 'This action cannot be undone',
  'dangerZone.deleteWarningTitle': 'Warning',
  'dangerZone.deleteWarningMessage': 'Deleting your account will permanently erase all your data, including:',
  'dangerZone.deletePlansBullet': 'All travel plans you created',
  'dangerZone.deleteItemsBullet': 'All itinerary items',
  'dangerZone.deleteAccessBullet': 'All shared travel plan access',
  'dangerZone.deleteInfoBullet': 'Your profile information',
  'dangerZone.deleteSharedNote': 'You will also be removed from any travel plans shared with you by others.',
  'dangerZone.deleteConfirmationText': 'delete my account',
  'dangerZone.deleteConfirmationPlaceholder': 'delete my account',
  'dangerZone.deleteConfirmationPrompt': 'Type "delete my account" to confirm',
  'dangerZone.deleteConfirmationError': 'Text does not match. Type exactly: delete my account',
  'dangerZone.deleteReadyConfirm': '✓ Ready to delete',
  'dangerZone.deleteAccountPermanently': 'Delete Account Permanently',
  'dangerZone.deletingAccount': 'Deleting account, please wait',
  'dangerZone.deletingEllipsis': 'Deleting…',

  // Share Accept
  'shareAccept.title': 'Accept Travel Plan Invite',
  'shareAccept.subtitle': "You've been invited to collaborate on a travel plan",
  'shareAccept.description': 'Click the button below to accept the invitation and start collaborating.',
  'shareAccept.acceptInvite': 'Accept Invite',
  'shareAccept.accepting': 'Accepting invite...',
  'shareAccept.inviteAccepted': 'Invite accepted! Redirecting...',
  'shareAccept.inviteExpired': 'This invite has expired or is no longer valid.',
  'shareAccept.alreadyAccepted': "You've already accepted this invite.",
  'shareAccept.errorAccepting': 'Could not accept invite. Please try again.',
  'shareAccept.backToHome': 'Back to home',

  // Common buttons
  'buttons.back': 'Back',
  'buttons.cancel': 'Cancel',
  'buttons.save': 'Save',
  'buttons.delete': 'Delete',
  'buttons.confirm': 'Confirm',
  'buttons.close': 'Close',

  // Additional test keys (overriding with specific values for tests)
  'shareAccept.acceptTitle': 'Accept Travel Plan Invite',
  'shareAccept.invalidInviteTitle': 'Invalid Invite',
  'shareAccept.invalidInviteMessage': 'This invite is no longer valid.',
  'shareAccept.confirming': 'Confirming...',
  'shareAccept.preparing': 'Preparing invite...',
  'shareAccept.success': 'Invitation accepted! Redirecting...',
  'shareAccept.error': 'Could not accept invite. Please try again.',
};

vi.mock('react-i18next', () => ({
  useTranslation: (ns?: string) => ({
    t: (key: string, opts?: Record<string, any>) => {
      // For namespaced keys like 'travel-plans:sharing.share', extract the key part
      const actualKey = key.includes(':') ? key.split(':')[1] : key;
      let result = translationMap[actualKey];

      if (!result) {
        // Fallback: return key as-is for unmapped keys
        result = key;
      }

      // Handle returnObjects for array values
      if (opts?.returnObjects && Array.isArray(result)) {
        return result;
      }

      // Handle interpolation if options provided
      if (opts && typeof result === 'string') {
        let str = result;
        Object.entries(opts).forEach(([optKey, optValue]) => {
          if (optKey !== 'returnObjects') {
            str = str.replace(new RegExp(`{{${optKey}}}`, 'g'), String(optValue));
          }
        });
        return str;
      }

      return result;
    },
    i18n: { changeLanguage: vi.fn(), language: 'en' },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: { type: '3rdParty' as const, init: vi.fn() },
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
}));
