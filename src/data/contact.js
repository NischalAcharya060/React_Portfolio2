import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaInstagram,
    FaWhatsapp
} from 'react-icons/fa';

export const contactInfo = [
    {
        icon: FaEnvelope,
        label: 'Email',
        value: 'Nischal060@gmail.com',
        href: 'mailto:Nischal060@gmail.com',
        color: '#D44638',
        description: 'Send me an email anytime',
        type: 'email'
    },
    {
        icon: FaPhone,
        label: 'Phone',
        value: '+977 9806081469',
        href: 'tel:+9779806081469',
        color: '#25D366',
        description: 'Call Me',
        type: 'phone'
    },
    {
        icon: FaMapMarkerAlt,
        label: 'Location',
        value: 'Gauradaha-Jhapa, Nepal',
        href: 'https://maps.google.com/?q=Gauradaha-Jhapa,Nepal',
        color: '#FF6B6B',
        description: 'Available for remote work',
        type: 'location'
    },
    {
        icon: FaWhatsapp,
        label: 'WhatsApp',
        value: '+977 9806081469',
        href: 'https://wa.me/9779806081469',
        color: '#25D366',
        description: 'Quick response guaranteed',
        type: 'whatsapp'
    }
];

export const socialLinks = [
    {
        icon: FaGithub,
        href: 'https://github.com/NischalAcharya060',
        label: 'GitHub',
        color: '#333333',
        username: '@NischalAcharya060',
        type: 'github'
    },
    {
        icon: FaLinkedin,
        href: 'https://www.linkedin.com/in/nischal-acharya101/',
        label: 'LinkedIn',
        color: '#0077B5',
        username: '@nischal-acharya101',
        type: 'linkedin'
    },
    {
        icon: FaTwitter,
        href: 'https://x.com/nischalacharya_',
        label: 'Twitter',
        color: '#1DA1F2',
        username: '@nischalacharya_',
        type: 'twitter'
    },
    {
        icon: FaInstagram,
        href: 'https://www.instagram.com/its_nischalacharya/',
        label: 'Instagram',
        color: '#E4405F',
        username: '@its_nischalacharya',
        type: 'instagram'
    }
];

export const formFields = [
    {
        name: 'name',
        label: 'Full Name *',
        type: 'text',
        placeholder: 'Enter your full name',
        required: true,
        grid: { md: 6 }
    },
    {
        name: 'email',
        label: 'Email Address *',
        type: 'email',
        placeholder: 'your.email@example.com',
        required: true,
        grid: { md: 6 }
    },
    {
        name: 'subject',
        label: 'Subject *',
        type: 'text',
        placeholder: 'What\'s this about?',
        required: true,
        grid: { xs: 12 }
    },
    {
        name: 'message',
        label: 'Your Message *',
        type: 'textarea',
        placeholder: 'Tell me about your project, ideas, or questions...',
        required: true,
        rows: 6,
        grid: { xs: 12 }
    }
];