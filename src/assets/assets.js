import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    doc1,
    doc2,
    doc3,
    doc4,
    doc5,
    doc6,
    doc7,
    doc8,
    doc9,
    doc10,
    doc11,
    doc12,
    doc13,
    doc14,
    doc15
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Rajesh Kumar',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '15 Years',
        about: 'Dr. Kumar has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 800,
        address: {
            line1: '17th Cross, Bandra West',
            line2: 'Mumbai, Maharashtra'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Priya Sharma',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '12 Years',
        about: 'Dr. Sharma specializes in women\'s health and has extensive experience in handling complex gynecological cases.',
        fees: 1000,
        address: {
            line1: '27th Cross, Connaught Place',
            line2: 'Delhi, NCR'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Amit Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '8 Years',
        about: 'Dr. Patel is an expert in treating various skin conditions and cosmetic procedures.',
        fees: 600,
        address: {
            line1: '37th Cross, Indiranagar',
            line2: 'Bangalore, Karnataka'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Rajesh Gupta',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '10 Years',
        about: 'Dr. Gupta is dedicated to providing the best healthcare for children with a gentle and caring approach.',
        fees: 500,
        address: {
            line1: '47th Cross, Anna Nagar',
            line2: 'Chennai, Tamil Nadu'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Ananya Singh',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '18 Years',
        about: 'Dr. Singh is a renowned neurologist with expertise in treating complex neurological disorders.',
        fees: 1200,
        address: {
            line1: '57th Cross, Jubilee Hills',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Arjun Reddy',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '14 Years',
        about: 'Dr. Reddy specializes in treating neurological conditions with a focus on preventive care.',
        fees: 1000,
        address: {
            line1: '67th Cross, Salt Lake',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Vikram Verma',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '16 Years',
        about: 'Dr. Verma provides comprehensive primary healthcare with a focus on preventive medicine.',
        fees: 800,
        address: {
            line1: '77th Cross, Koregaon Park',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Ramesh Choudhary',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '13 Years',
        about: 'Dr. Iyer is an experienced gynecologist specializing in high-risk pregnancies.',
        fees: 1000,
        address: {
            line1: '87th Cross, Satellite',
            line2: 'Ahmedabad, Gujarat'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Nitya Menon',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '11 Years',
        about: 'Dr. Menon is an expert in treating skin conditions and performing cosmetic procedures.',
        fees: 600,
        address: {
            line1: '97th Cross, Panampilly Nagar',
            line2: 'Kochi, Kerala'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Deepak Nair',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '9 Years',
        about: 'Dr. Nair provides comprehensive pediatric care with a focus on child development.',
        fees: 500,
        address: {
            line1: '107th Cross, Malviya Nagar',
            line2: 'Jaipur, Rajasthan'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Simran Sharma',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '17 Years',
        about: 'Dr. Sharma is a leading neurologist specializing in movement disorders.',
        fees: 1200,
        address: {
            line1: '117th Cross, Banjara Hills',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Sanjay Verma',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '15 Years',
        about: 'Dr. Verma is an expert in treating neurological disorders with a focus on stroke management.',
        fees: 1000,
        address: {
            line1: '127th Cross, Lake Gardens',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Ramya Kumar',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '14 Years',
        about: 'Dr. Kumar provides comprehensive primary healthcare with expertise in preventive medicine.',
        fees: 800,
        address: {
            line1: '137th Cross, Deccan Gymkhana',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Vikram Reddy',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '16 Years',
        about: 'Dr. Reddy is a senior gynecologist specializing in reproductive medicine.',
        fees: 1000,
        address: {
            line1: '147th Cross, Bodakdev',
            line2: 'Ahmedabad, Gujarat'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Pooja Menon',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '10 Years',
        about: 'Dr. Menon is an expert in treating skin conditions and performing aesthetic procedures.',
        fees: 600,
        address: {
            line1: '157th Cross, MG Road',
            line2: 'Kochi, Kerala'
        }
    },
]