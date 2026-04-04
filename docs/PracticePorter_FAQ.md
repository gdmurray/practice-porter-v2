# Practice Porter — FAQ Section Content

This document contains all copy and implementation notes for the FAQ section of the Practice Porter website.

---

## SEO Implementation Notes for Developer

- Wrap all Q&A pairs in **FAQ schema markup (JSON-LD)** so Google can surface answers in rich results and "People Also Ask" boxes.
- Use `<details>` / `<summary>` tags or an accordion component for the UI — this is the recommended pattern for FAQ schema compatibility.
- Each question has been written to target a specific long-tail keyword that dental practice owners search for. Do not rephrase the questions, as the wording is intentional for SEO.
- Place the FAQ section toward the bottom of the page, above the footer CTA.

### JSON-LD Schema Template

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Practice Porter answer calls for my dental practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When a new patient calls your practice, the call routes to our dedicated team through a tracking number. From the patient's perspective, they're speaking with someone at your office. We learn your scheduling software, appointment types, office protocols, and brand voice so that every interaction feels seamless and in-house. We answer, we handle objections, and we book the appointment directly into your system."
      }
    }
    // ... repeat for each question
  ]
}
</script>
```

---

## FAQ Questions & Answers

### Q1: How does Practice Porter answer calls for my dental practice?

When a new patient calls your practice, the call routes to our dedicated team through a tracking number. From the patient's perspective, they're speaking with someone at your office. We learn your scheduling software, appointment types, office protocols, and brand voice so that every interaction feels seamless and in-house. We answer, we handle objections, and we book the appointment directly into your system.

**Target keyword:** "how does dental answering service work"

---

### Q2: How is Practice Porter different from a regular dental answering service?

Most answering services are high-volume call centers that take messages and pass them along. We don't take messages. We book patients. We schedule directly into your practice management system, follow up on missed calls, and provide you with a monthly Performance Scorecard that shows exactly how many patients were booked, your cost per acquisition, and how your team's phone performance compares to ours. We're a boutique conversion team, not a voicemail replacement.

**Target keyword:** "dental answering service vs call center"

---

### Q3: What kind of results can I expect?

Our clients see a new patient booking rate above 90%, compared to the industry average of about 33%. That means for every 10 new patient calls, we're booking 9 or more, while the typical front desk books 3. For most practices, that translates to a 3 to 5x return on investment within the first few months. We prove it with data every month through our Performance Scorecard.

**Target keyword:** "how to improve new patient conversion rate dental practice"

---

### Q4: How much does Practice Porter cost?

Our call answering service is $150 per patient booked. You only pay when we actually schedule an appointment, so there's no risk. If we don't book, you don't pay. Our Performance Report Card is $495 per month and gives you full visibility into call volumes, conversion rates, staff performance, Google review tracking, and marketing ROI. Both services work independently or together, and there are no setup fees or long-term contracts.

**Target keyword:** "dental answering service cost pricing"

---

### Q5: How long does it take to get started?

Most practices are fully live within a week. Days one and two, we learn your practice: your scheduling system, protocols, appointment types, and brand voice. Days three and four, we set up call routing through a dedicated tracking number. Your team and your patients won't notice any disruption. From there, we're answering and booking.

**Target keyword:** "how to set up dental answering service"

---

### Q6: Do you work with my practice management software?

Yes. We schedule appointments directly into your existing system. During onboarding, we learn your software, your scheduling preferences, and your appointment types so that every booking lands exactly where it should, with no extra steps or manual entry on your end.

**Target keyword:** "dental answering service practice management software integration"

---

### Q7: How many new patients am I losing from missed calls?

Industry data shows that 45% of calls to dental practices go unanswered, and the average practice loses over $150,000 in potential annual revenue from missed and mishandled new patient calls. Most practice owners assume their phones are being handled well, but without call tracking and conversion data, there's no way to know for sure. Our Performance Report Card shows you exactly what's happening with every call so you can see the real picture.

**Target keyword:** "how many new patients are dental practices losing from missed calls"

---

### Q8: What happens if a new patient calls after hours or when my staff is busy?

That's exactly when we're most valuable. Whether your team is with a patient, at lunch, or the office is closed, we make sure the call gets answered. We also run missed call recovery workflows, so if a call does slip through, we follow up to make sure that patient still gets booked. New patients don't leave voicemails and wait around. Research shows you have about 24 hours before they call someone else.

**Target keyword:** "dental practice after hours call answering"

---

### Q9: What does the Performance Report Card include?

The Report Card is a monthly analytics package that covers call volume, new patient conversion rates, cost per booked appointment, staff-level performance comparisons, missed call tracking, Google review velocity, and marketing source attribution. It shows you not just how our team is performing, but how your in-house staff handles calls as well. Think of it as a complete diagnostic of your front desk's ability to convert marketing spend into patients in chairs.

**Target keyword:** "dental practice performance reporting analytics"

---

*Content prepared by Practice Porter. Questions? Contact info@practiceporter.ca*
