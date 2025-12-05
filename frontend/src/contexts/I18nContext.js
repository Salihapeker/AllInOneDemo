import React, { createContext, useState, useMemo, useEffect } from "react";

/*
 Simple i18n Context
 - Languages: 'tr' (Turkish), 'de' (German), 'en' (English)
 - Usage: const { t, locale, setLocale } = useI18n();
 - Keep translations small and extendable. Add keys used across UI.
*/

const TRANSLATIONS = {
  tr: {
    // Navbar
    home: "Ana Sayfa",
    services: "Hizmetler",
    about: "Hakkımızda",
    contact: "İletişim",
    login: "Giriş",
    register: "Kayıt Ol",
    profile: "Profil",
    logout: "Çıkış",
    for_you: "for you",
    
    // Auth
    email: "E-posta",
    password: "Şifre",
    confirm_password: "Şifre Tekrar",
    forgot_password: "Şifremi Unuttum",
    reset_password: "Şifre Sıfırla",
    full_name: "Ad Soyad",
    phone: "Telefon",
    address: "Adres",
    
    // Services
    all_services: "Tüm Hizmetler",
    book_appointment: "Randevu Al",
    view_calendar: "Takvimi Gör",
    calendar: "Takvimi Gör",
    prechat: "Ön Görüşme",
    book: "Randevu Talep Et",
    service_details: "Hizmet Detayları",
    price: "Fiyat",
    duration: "Süre",
    rating: "Puan",
    
    // Appointments
    pending: "Beklemede",
    approved: "Onaylandı",
    rejected: "Reddedildi",
    cancelled: "İptal Edildi",
    approve: "Onayla",
    reject: "Reddet",
    cancel: "İptal Et",
    appointments: "Randevular",
    my_appointments: "Randevularım",
    todays_appointments: "Bugünkü Randevular",
    upcoming_appointments: "Yaklaşan Randevular",
    past_appointments: "Geçmiş Randevular",
    no_appointments: "Henüz randevunuz bulunmuyor.",
    
    // Admin
    admin_dashboard: "Admin Paneli",
    users: "Kullanıcılar",
    workers: "Çalışanlar",
    categories: "Kategoriler",
    reports: "Raporlar",
    total_users: "Toplam Kullanıcı",
    total_providers: "Hizmet Veren",
    active_appointments: "Aktif Randevu",
    pending_applications: "Bekleyen Başvuru",
    recent_activities: "Son Aktiviteler",
    quick_actions: "Hızlı İşlemler",
    user_management: "Kullanıcı Yönetimi",
    worker_management: "Çalışan Yönetimi",
    category_management: "Kategori Yönetimi",
    appointment_management: "Randevu Yönetimi",
    
    // Provider
    my_calendar: "Takvimim",
    my_profile: "Profilim",
    provider_dashboard: "Çalışan Paneli",
    completed_jobs: "Tamamlanan İş",
    working_hours: "Çalışma Saatleri",
    edit_profile: "Profili Düzenle",
    manage_appointments: "Randevuları Yönet",
    view_requests: "Talepleri Görüntüle",
    set_availability: "Uygunluk Ayarla",
    
    // Common
    save: "Kaydet",
    delete: "Sil",
    edit: "Düzenle",
    view: "Görüntüle",
    close: "Kapat",
    submit: "Gönder",
    back: "Geri",
    next: "İleri",
    loading: "Yükleniyor...",
    no_data: "Veri bulunamadı",
    search: "Ara",
    filter: "Filtrele",
    sort: "Sırala",
    all: "Tümü",
    clear_filters: "Filtreleri Temizle",
    confirm: "Onayla",
    yes: "Evet",
    no: "Hayır",
    
    // Footer
    privacy_policy: "Gizlilik Politikası",
    terms_of_service: "Kullanım Şartları",
    cookie_policy: "Çerez Politikası",
    quick_links: "Hızlı Linkler",
    popular_services: "Popüler Hizmetler",
    contact_info: "İletişim",
    all_rights_reserved: "Tüm hakları saklıdır.",
    
    // Messages
    login_required: "Bu işlem için giriş yapmalısınız.",
    booking_requires_login: "Randevu oluşturmak için giriş yapmalısınız.",
    booking_success: "Randevu talebiniz başarıyla gönderildi.",
    booking_error: "Randevu oluşturulurken bir hata oluştu.",
    login_success: "Başarıyla giriş yaptınız.",
    login_error: "Giriş yapılırken bir hata oluştu.",
    register_success: "Başarıyla kayıt oldunuz.",
    register_error: "Kayıt olurken bir hata oluştu.",
    save_success: "Başarıyla kaydedildi.",
    save_error: "Kaydedilirken bir hata oluştu.",
    delete_success: "Başarıyla silindi.",
    delete_error: "Silinirken bir hata oluştu.",
    error_occurred: "Bir hata oluştu.",
    try_again: "Lütfen tekrar deneyin.",
    
    // Welcome
    welcome: "Hoş geldiniz",
    welcome_back: "Tekrar hoş geldiniz",
  },
  de: {
    // Navbar
    home: "Startseite",
    services: "Dienstleistungen",
    about: "Über uns",
    contact: "Kontakt",
    login: "Anmelden",
    register: "Registrieren",
    profile: "Profil",
    logout: "Abmelden",
    for_you: "für dich",
    
    // Auth
    email: "E-Mail",
    password: "Passwort",
    confirm_password: "Passwort bestätigen",
    forgot_password: "Passwort vergessen",
    reset_password: "Passwort zurücksetzen",
    full_name: "Vollständiger Name",
    phone: "Telefon",
    address: "Adresse",
    
    // Services
    all_services: "Alle Dienstleistungen",
    book_appointment: "Termin buchen",
    view_calendar: "Kalender ansehen",
    calendar: "Kalender ansehen",
    prechat: "Vorgespräch",
    book: "Termin anfordern",
    service_details: "Dienstleistungsdetails",
    price: "Preis",
    duration: "Dauer",
    rating: "Bewertung",
    
    // Appointments
    pending: "Ausstehend",
    approved: "Genehmigt",
    rejected: "Abgelehnt",
    cancelled: "Storniert",
    approve: "Genehmigen",
    reject: "Ablehnen",
    cancel: "Abbrechen",
    appointments: "Termine",
    my_appointments: "Meine Termine",
    todays_appointments: "Heutige Termine",
    upcoming_appointments: "Kommende Termine",
    past_appointments: "Vergangene Termine",
    no_appointments: "Sie haben noch keine Termine.",
    
    // Admin
    admin_dashboard: "Admin-Dashboard",
    users: "Benutzer",
    workers: "Arbeiter",
    categories: "Kategorien",
    reports: "Berichte",
    total_users: "Gesamtbenutzer",
    total_providers: "Dienstleister",
    active_appointments: "Aktive Termine",
    pending_applications: "Ausstehende Bewerbungen",
    recent_activities: "Letzte Aktivitäten",
    quick_actions: "Schnellaktionen",
    user_management: "Benutzerverwaltung",
    worker_management: "Arbeiterverwaltung",
    category_management: "Kategorieverwaltung",
    appointment_management: "Terminverwaltung",
    
    // Provider
    my_calendar: "Mein Kalender",
    my_profile: "Mein Profil",
    provider_dashboard: "Anbieter-Dashboard",
    completed_jobs: "Abgeschlossene Aufträge",
    working_hours: "Arbeitszeiten",
    edit_profile: "Profil bearbeiten",
    manage_appointments: "Termine verwalten",
    view_requests: "Anfragen anzeigen",
    set_availability: "Verfügbarkeit festlegen",
    
    // Common
    save: "Speichern",
    delete: "Löschen",
    edit: "Bearbeiten",
    view: "Ansehen",
    close: "Schließen",
    submit: "Absenden",
    back: "Zurück",
    next: "Weiter",
    loading: "Lädt...",
    no_data: "Keine Daten gefunden",
    search: "Suchen",
    filter: "Filtern",
    sort: "Sortieren",
    all: "Alle",
    clear_filters: "Filter löschen",
    confirm: "Bestätigen",
    yes: "Ja",
    no: "Nein",
    
    // Footer
    privacy_policy: "Datenschutzrichtlinie",
    terms_of_service: "Nutzungsbedingungen",
    cookie_policy: "Cookie-Richtlinie",
    quick_links: "Schnelllinks",
    popular_services: "Beliebte Dienste",
    contact_info: "Kontakt",
    all_rights_reserved: "Alle Rechte vorbehalten.",
    
    // Messages
    login_required: "Sie müssen angemeldet sein, um diese Aktion durchzuführen.",
    booking_requires_login: "Um einen Termin zu erstellen, müssen Sie sich anmelden.",
    booking_success: "Ihre Terminanfrage wurde erfolgreich gesendet.",
    booking_error: "Beim Erstellen des Termins ist ein Fehler aufgetreten.",
    login_success: "Sie haben sich erfolgreich angemeldet.",
    login_error: "Bei der Anmeldung ist ein Fehler aufgetreten.",
    register_success: "Sie haben sich erfolgreich registriert.",
    register_error: "Bei der Registrierung ist ein Fehler aufgetreten.",
    save_success: "Erfolgreich gespeichert.",
    save_error: "Beim Speichern ist ein Fehler aufgetreten.",
    delete_success: "Erfolgreich gelöscht.",
    delete_error: "Beim Löschen ist ein Fehler aufgetreten.",
    error_occurred: "Ein Fehler ist aufgetreten.",
    try_again: "Bitte versuchen Sie es erneut.",
    
    // Welcome
    welcome: "Willkommen",
    welcome_back: "Willkommen zurück",
  },
  en: {
    // Navbar
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    login: "Login",
    register: "Register",
    profile: "Profile",
    logout: "Logout",
    for_you: "for you",
    
    // Auth
    email: "Email",
    password: "Password",
    confirm_password: "Confirm Password",
    forgot_password: "Forgot Password",
    reset_password: "Reset Password",
    full_name: "Full Name",
    phone: "Phone",
    address: "Address",
    
    // Services
    all_services: "All Services",
    book_appointment: "Book Appointment",
    view_calendar: "View Calendar",
    calendar: "See calendar",
    prechat: "Pre-chat",
    book: "Request appointment",
    service_details: "Service Details",
    price: "Price",
    duration: "Duration",
    rating: "Rating",
    
    // Appointments
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    cancelled: "Cancelled",
    approve: "Approve",
    reject: "Reject",
    cancel: "Cancel",
    appointments: "Appointments",
    my_appointments: "My Appointments",
    todays_appointments: "Today's Appointments",
    upcoming_appointments: "Upcoming Appointments",
    past_appointments: "Past Appointments",
    no_appointments: "You don't have any appointments yet.",
    
    // Admin
    admin_dashboard: "Admin Dashboard",
    users: "Users",
    workers: "Workers",
    categories: "Categories",
    reports: "Reports",
    total_users: "Total Users",
    total_providers: "Service Providers",
    active_appointments: "Active Appointments",
    pending_applications: "Pending Applications",
    recent_activities: "Recent Activities",
    quick_actions: "Quick Actions",
    user_management: "User Management",
    worker_management: "Worker Management",
    category_management: "Category Management",
    appointment_management: "Appointment Management",
    
    // Provider
    my_calendar: "My Calendar",
    my_profile: "My Profile",
    provider_dashboard: "Provider Dashboard",
    completed_jobs: "Completed Jobs",
    working_hours: "Working Hours",
    edit_profile: "Edit Profile",
    manage_appointments: "Manage Appointments",
    view_requests: "View Requests",
    set_availability: "Set Availability",
    
    // Common
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    close: "Close",
    submit: "Submit",
    back: "Back",
    next: "Next",
    loading: "Loading...",
    no_data: "No data found",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    all: "All",
    clear_filters: "Clear Filters",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
    
    // Footer
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    cookie_policy: "Cookie Policy",
    quick_links: "Quick Links",
    popular_services: "Popular Services",
    contact_info: "Contact",
    all_rights_reserved: "All rights reserved.",
    
    // Messages
    login_required: "You must be logged in to perform this action.",
    booking_requires_login: "You must be logged in to book an appointment.",
    booking_success: "Your appointment request has been sent successfully.",
    booking_error: "An error occurred while creating the appointment.",
    login_success: "You have successfully logged in.",
    login_error: "An error occurred during login.",
    register_success: "You have successfully registered.",
    register_error: "An error occurred during registration.",
    save_success: "Successfully saved.",
    save_error: "An error occurred while saving.",
    delete_success: "Successfully deleted.",
    delete_error: "An error occurred while deleting.",
    error_occurred: "An error occurred.",
    try_again: "Please try again.",
    
    // Welcome
    welcome: "Welcome",
    welcome_back: "Welcome back",
  },
};

export const I18nContext = createContext({
  locale: "tr",
  setLocale: () => {},
  t: (k) => k,
});

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    try {
      return localStorage.getItem("locale") || "tr";
    } catch {
      return "tr";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch {}
  }, [locale]);

  const t = useMemo(
    () => (key) => {
      return TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS["en"][key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};
