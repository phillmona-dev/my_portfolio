import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """
    Custom canvas that performs two-pass rendering to dynamically compute the 
    total page count and draw a professional header/footer on each page.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        # Save state of current page to render page numbers at the end
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # --- FOOTER ---
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor('#555555'))
        
        # Thin divider line above footer
        self.setStrokeColor(colors.HexColor('#e0e0e0'))
        self.setLineWidth(0.5)
        self.line(40, 35, 555, 35) # Left margin: 40pt, Right margin: 40pt (595.28 - 40 = 555.28)
        
        # Left side: Resume identification
        self.drawString(40, 22, "Filimon Kiros — Professional CV  |  Full Stack Engineer")
        
        # Right side: Dynamic page count
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(555, 22, page_text)
        
        self.restoreState()


def generate_pdf(output_path):
    # Ensure parent directories exist
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Margins: left/right=40pt (approx 0.55in), top=40pt, bottom=48pt
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=40,
        bottomMargin=48
    )

    styles = getSampleStyleSheet()

    # Define portfolio-aligned color scheme
    accent_color = colors.HexColor('#e8533a')  # Coral accent
    text_dark = colors.HexColor('#1a1a1a')
    text_muted = colors.HexColor('#555555')
    line_grey = colors.HexColor('#e0e0e0')

    # Define typography styles
    body_style = ParagraphStyle(
        'CVBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=text_dark,
        spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'CVBullet',
        parent=body_style,
        fontSize=9.2,
        leading=13,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=3.5
    )

    name_style = ParagraphStyle(
        'CVName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#111111'),
        alignment=1,  # Centered
        spaceAfter=3
    )

    sub_style = ParagraphStyle(
        'CVSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=14,
        textColor=accent_color,
        alignment=1,  # Centered
        spaceAfter=6
    )

    contact_style = ParagraphStyle(
        'CVContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_muted,
        alignment=1,  # Centered
        spaceAfter=8
    )

    section_style = ParagraphStyle(
        'CVSection',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=accent_color,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    item_title_style = ParagraphStyle(
        'CVItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#111111'),
        keepWithNext=True
    )

    item_meta_style = ParagraphStyle(
        'CVItemMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=11.5,
        textColor=text_muted,
        keepWithNext=True
    )

    item_meta_right_style = ParagraphStyle(
        'CVItemMetaRight',
        parent=item_meta_style,
        alignment=2  # Right aligned
    )

    story = []

    # --- PAGE 1: HEADER & CONTACT INFO ---
    story.append(Paragraph("FILIMON KIROS", name_style))
    story.append(Paragraph("FULL STACK ENGINEER", sub_style))

    contact_html = (
        "Email: <a href=\"mailto:phillipos1212@gmail.com\"><font color=\"#e8533a\"><b>phillipos1212@gmail.com</b></font></a>   |   "
        "Phone: <a href=\"tel:+251962608563\"><font color=\"#555555\"><b>+251962608563</b></font></a>   |   "
        "Location: Addis Ababa, Ethiopia<br/>"
        "LinkedIn: <a href=\"https://linkedin.com/in/filmon-kiros-a799252b0\"><font color=\"#e8533a\"><b>linkedin.com/in/filmon-kiros-a799252b0</b></font></a>   |   "
        "GitHub: <a href=\"https://github.com/phillmona-dev\"><font color=\"#e8533a\"><b>github.com/phillmona-dev</b></font></a>   |   "
        "GitLab: <a href=\"https://gitlab.com/phillmonaDev05-gitlab\"><font color=\"#e8533a\"><b>gitlab.com/phillmonaDev05-gitlab</b></font></a>"
    )
    story.append(Paragraph(contact_html, contact_style))

    # Divider Line
    divider = Table([['']], colWidths=[515])
    divider.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,-1), 1.5, accent_color),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(divider)
    story.append(Spacer(1, 8))

    # Section generator helper
    def add_section(title_text):
        t = Table([[Paragraph(title_text, section_style)]], colWidths=[515])
        t.setStyle(TableStyle([
            ('LINEBELOW', (0,0), (-1,-1), 1, line_grey),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(t)
        story.append(Spacer(1, 4))

    # --- PROFESSIONAL SUMMARY ---
    add_section("PROFESSIONAL SUMMARY")
    summary_text = (
        "Highly skilled and detail-oriented Full Stack Engineer with over 2 years of hands-on "
        "experience building enterprise-grade, scalable, and secure systems in the healthcare, insurance, and ERP sectors. "
        "Specializes in Java, Spring Boot, Spring AI, Microservices, React, and Next.js, with additional expertise in "
        "Odoo ERP (versions 17, 18 & 19) custom module development and Bahmni-Odoo hospital ERP deployments. "
        "Proven expertise in Docker, Kubernetes, CI/CD pipelines, Cloud Deployment (AWS, GCP, Azure), and Observability & DevOps. "
        "Strong track record of delivering impactful software solutions that serve millions of users across Ethiopia."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 6))

    # --- TECHNICAL SKILLS ---
    add_section("TECHNICAL SKILLS")
    skills_data = [
        [Paragraph("<b>Programming Languages:</b>", body_style), Paragraph("Java, Python, JavaScript (ES6+), TypeScript, SQL", body_style)],
        [Paragraph("<b>Frameworks & Libraries:</b>", body_style), Paragraph("Spring Boot, Spring AI, Spring Security, Spring Cloud, React, Next.js", body_style)],
        [Paragraph("<b>ERP & Business Systems:</b>", body_style), Paragraph("Odoo 17, 18 & 19 (Custom Module Dev, Manufacturing, Inventory, POS, Accounting, HR), Bahmni EMR", body_style)],
        [Paragraph("<b>Databases & Caching:</b>", body_style), Paragraph("PostgreSQL, MySQL, MongoDB, Redis, SQL Server", body_style)],
        [Paragraph("<b>DevOps & Observability:</b>", body_style), Paragraph("Docker, Kubernetes, CI/CD (GitHub Actions, Azure DevOps), Prometheus, Grafana", body_style)],
        [Paragraph("<b>Cloud & Interop:</b>", body_style), Paragraph("AWS, GCP, Azure, HL7 FHIR, OpenFn Integration Platform, REST APIs, Chapa API, Telebirr API", body_style)]
    ]
    skills_table = Table(skills_data, colWidths=[130, 385])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 6))

    # --- PROFESSIONAL EXPERIENCE (PART 1) ---
    add_section("PROFESSIONAL EXPERIENCE")
    
    # Current Role
    role_table_data = [
        [Paragraph("<b>Backend Developer</b>", item_title_style), Paragraph("Addis Ababa, Ethiopia", item_meta_right_style)],
        [Paragraph("Medco Technology Solutions", item_meta_style), Paragraph("May 2024 – Present", item_meta_right_style)]
    ]
    role_table = Table(role_table_data, colWidths=[315, 200])
    role_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(role_table)
    story.append(Spacer(1, 4))

    exp_bullets_p1 = [
        "Architected and maintained robust, secure, and high-performance RESTful APIs using <b>Java</b> and <b>Spring Boot</b> for enterprise healthcare and insurance platforms.",
        "Built the backend for the <b>FETAP (Foreign Employment Term Assurance Platform)</b> for Niyala Insurance, processing real-time insurance premiums, policy issuances, and claim workflows.",
        "Designed and implemented key services for the <b>Kenema Pharmacy Management System (KPMS)</b>, serving a multi-branch network of 54+ pharmacies across Ethiopia.",
        "Developed the <b>HealthConnect Interoperability Layer</b> to bridge healthcare provider systems with insurance carriers using FHIR and HL7 data exchange standards."
    ]

    for bullet in exp_bullets_p1:
        story.append(Paragraph(f"• {bullet}", bullet_style))

    # Clean Page Break to keep it exactly 2 pages with a professional flow
    story.append(PageBreak())

    # --- PAGE 2: EXPERIENCE (PART 2) & EDUCATION & PROJECTS ---
    story.append(Paragraph("FILIMON KIROS", name_style))
    story.append(Paragraph("FULL STACK ENGINEER   |   <a href=\"mailto:phillipos1212@gmail.com\"><font color=\"#e8533a\">phillipos1212@gmail.com</font></a>", contact_style))
    story.append(divider)
    story.append(Spacer(1, 8))

    add_section("PROFESSIONAL EXPERIENCE (CONTINUED)")

    exp_bullets_p2 = [
        "Deployed and customized the open-source <b>Bahmni EMR</b> system (OpenMRS, OpenELIS, and Odoo ERP components) for Bishoftu and Wukro hospitals, configuring them to hospital-specific clinical workflows.",
        "Integrated the <b>Chapa Digital Payment Gateway</b> into Bahmni-Odoo hospital EMR workflows at St. Peter Hospital, St. Paul Hospital (Millennium Medical College), and Adama General Hospital, streamlining patient billing and payment processing.",
        "Integrated <b>Telebirr (Ethio Telecom MiniApp & USSD)</b> with Bahmni-Odoo across multiple hospitals, enabling patients to settle hospital bills via Ethiopia's leading mobile money platform.",
        "Developed custom <b>Odoo ERP modules</b> (versions 17, 18 & 19) for clients across manufacturing, pharmacy, hospitality, and multi-industry sectors — including manufacturing MRP for Domain Aluminium (Adama), pharmacy management for Kenema Pharmacies government network (54+ branches), hotel ERP for Romanat Hotel (Addis Ababa), and a three-in-one administrative ERP combining Construction, Import/Export, and School management."
    ]
    for bullet in exp_bullets_p2:
        story.append(Paragraph(f"• {bullet}", bullet_style))
    story.append(Spacer(1, 6))

    # Intern Role
    intern_table_data = [
        [Paragraph("<b>Software Developer Intern</b>", item_title_style), Paragraph("Addis Ababa, Ethiopia", item_meta_right_style)],
        [Paragraph("Medco Technology Solutions", item_meta_style), Paragraph("Feb 2019 – April 2019", item_meta_right_style)]
    ]
    intern_table = Table(intern_table_data, colWidths=[315, 200])
    intern_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(intern_table)
    story.append(Spacer(1, 4))

    intern_bullets = [
        "Participated in the design, development, and testing phases of the FetaIp Insurance project, utilizing Java and MySQL.",
        "Worked in an Agile development team, gaining experience in scrum ceremonies and version control workflows with Git."
    ]
    for bullet in intern_bullets:
        story.append(Paragraph(f"• {bullet}", bullet_style))
    story.append(Spacer(1, 6))

    # --- EDUCATION ---
    add_section("EDUCATION")
    edu_table_data = [
        [Paragraph("<b>Bachelor of Science in Electrical and Computer Engineering (Computer Stream)</b>", item_title_style), Paragraph("Adigrat, Ethiopia", item_meta_right_style)],
        [Paragraph("Adigrat University", item_meta_style), Paragraph("Sept 2015 – June 2021", item_meta_right_style)]
    ]
    edu_table = Table(edu_table_data, colWidths=[385, 130])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(edu_table)
    story.append(Spacer(1, 3))
    story.append(Paragraph("<b>Academic Standing:</b> Cumulative GPA: 3.7 / 4.0 (Distinction/Excellent score)", body_style))
    story.append(Paragraph("<b>Relevant Coursework:</b> Object-Oriented Programming (Java), Database Systems, Software Engineering, Data Communication and Computer Networks, Operating Systems, Computer Network Security, Microcomputers and Interfacing.", body_style))
    story.append(Spacer(1, 6))

    # --- PROJECTS ---
    add_section("KEY PROJECTS")

    proj_bullets = [
        "<b>CBHI Platform (Community-Based Health Insurance):</b> Developed scalable backend features for a platform managing 2.4M+ members for the Addis Ababa City Administration, optimizing enrollment and premium calculation pipelines.",
        "<b>Awash & Niyala Claims Management Systems:</b> Built integrations and automated claim processing pipelines using OpenFn, Spring Boot, and custom webhooks for efficient provider-payer claims settlement.",
        "<b>Prevention of Car Accident Due to Drowsiness (Final Project):</b> Developed a real-time computer vision system using Python and OpenCV that detects driver drowsiness and triggers an alarm system.",
        "<b>Design of Floor Cleaning Robot (Mini Project):</b> Conceptualized and developed an autonomous obstacle-avoiding floor cleaning robot prototype using microcontrollers and sensors."
    ]
    for bullet in proj_bullets:
        story.append(Paragraph(f"• {bullet}", bullet_style))
    story.append(Spacer(1, 6))

    # --- ODOO ERP PROJECTS ---
    add_section("ODOO ERP PROJECTS")

    odoo_intro = (
        "Custom Odoo module development across multiple industries on Odoo versions 17, 18 & 19, "
        "working as part of a development team to build and customize domain-specific ERP modules."
    )
    story.append(Paragraph(odoo_intro, body_style))
    story.append(Spacer(1, 4))

    odoo_projects = [
        (
            "Aluminium Manufacturing ERP",
            "Domain Aluminium Manufacturing — Adama, Ethiopia",
            "Odoo 17 | Testing Phase",
            "Custom manufacturing ERP covering production planning, raw material inventory, work order management, quality control, and manufacturing reporting (MRP, Inventory, Purchase, Quality modules)."
        ),
        (
            "Kenema Pharmacies Management System v2",
            "Government — Kenema Pharmacies, Addis Ababa (54+ Branches)",
            "Odoo 17 | Deployed",
            "Multi-branch pharmacy management system for the government-owned Kenema pharmacy network, handling inventory, prescription tracking, stock replenishment, and sales reporting across 54+ branches."
        ),
        (
            "Romanat Hotel Management System",
            "Romanat Hotel — Addis Ababa, Ethiopia",
            "Odoo 18 | Deployed",
            "Full hotel ERP covering reservations, front-desk operations, housekeeping, billing, and financial reporting (Hotel, POS, Accounting, HR modules)."
        ),
        (
            "Triple-Domain Administrative ERP",
            "Multi-Industry Client — Ethiopia",
            "Odoo 19 | Deployed",
            "Three-in-one administrative ERP integrating Construction project management, Import/Export trade operations, and School administrative management into a single unified platform."
        ),
    ]

    for proj_title, proj_client, proj_meta, proj_desc in odoo_projects:
        # Project title + meta row
        odoo_proj_row = [
            [Paragraph(f"<b>{proj_title}</b>", item_title_style), Paragraph(proj_meta, item_meta_right_style)],
            [Paragraph(proj_client, item_meta_style), Paragraph("", item_meta_style)]
        ]
        odoo_proj_table = Table(odoo_proj_row, colWidths=[315, 200])
        odoo_proj_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 1),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ]))
        story.append(odoo_proj_table)
        story.append(Paragraph(f"• {proj_desc}", bullet_style))
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 4))

    # --- CERTIFICATIONS & SOFT SKILLS ---
    add_section("CERTIFICATIONS & SOFT SKILLS")
    
    cert_text = (
        "<b>Certifications:</b> Networking Device Configuration, Maintenance, and Troubleshooting (Mekelle University ICT Center) | "
        "Axum University Talent Program Certificate (2014 & 2015)<br/>"
        "<b>Soft Skills:</b> Adaptability, Problem-Solving, Teamwork, Attention to Detail, Effective Interpersonal Communication, Time Management"
    )
    story.append(Paragraph(cert_text, body_style))

    # Build PDF using our dynamic NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF Generation complete.")


if __name__ == "__main__":
    # Path inside the user's workspace
    output_pdf = "/home/phillmon/Documents/mypros/my_port_folio/public/Filimon_Kiros_CV.pdf"
    generate_pdf(output_pdf)
