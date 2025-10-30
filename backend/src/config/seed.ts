import mongoose from 'mongoose'
import { nanoid } from 'nanoid'
import Booking from '../models/Booking.model'
import Experience from '../models/Experience.model'
import Slot from '../models/Slot.model'
import config from '../utils/config'

const experiences = [
  {
    name: 'Sunset Desert Safari',
    location: 'Jaisalmer, Rajasthan',
    price: 2499,
    description:
      'Experience the magical sunset over golden sand dunes with camel rides, traditional dance performances, and authentic Rajasthani dinner under the stars.',
    includes: [
      'Camel ride',
      'Desert camp dinner',
      'Cultural performances',
      'Photography spots',
      'Traditional welcome drink',
    ],
    minAge: 5,
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
  },
  {
    name: 'Backwater Houseboat Cruise',
    location: 'Alleppey, Kerala',
    price: 4999,
    description:
      'Drift through the serene backwaters of Kerala on a traditional houseboat. Enjoy freshly prepared Kerala cuisine and witness village life along the waterways.',
    includes: [
      'Full-day houseboat cruise',
      'Traditional Kerala lunch',
      'Tea & snacks',
      'Life jackets',
      'Guided tour',
    ],
    minAge: 3,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
  },
  {
    name: 'Himalayan Trek Experience',
    location: 'Manali, Himachal Pradesh',
    price: 3499,
    description:
      'Trek through pristine pine forests and meadows with breathtaking mountain views. Perfect for adventure seekers and nature lovers.',
    includes: [
      'Professional guide',
      'Trekking equipment',
      'Packed lunch',
      'First aid kit',
      'Photography assistance',
    ],
    minAge: 12,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  },
  {
    name: 'Heritage Walk & Food Tour',
    location: 'Old Delhi',
    price: 1299,
    description:
      'Explore the narrow lanes of Old Delhi, visit historical monuments, and savor authentic street food at iconic spots.',
    includes: [
      'Walking tour',
      'Food tastings (8+ items)',
      'Historical guide',
      'Bottled water',
      'Transportation to start point',
    ],
    minAge: 8,
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
  },
  {
    name: 'Scuba Diving Adventure',
    location: 'Andaman Islands',
    price: 5999,
    description:
      'Discover the underwater world with crystal clear waters and vibrant marine life. Perfect for beginners and experienced divers.',
    includes: [
      'PADI certified instructor',
      'All diving equipment',
      'Underwater photos',
      'Safety briefing',
      'Boat ride',
    ],
    minAge: 10,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  },
  {
    name: 'Wildlife Safari',
    location: 'Jim Corbett National Park',
    price: 3999,
    description:
      'Embark on an exciting jungle safari to spot tigers, elephants, and diverse wildlife in their natural habitat.',
    includes: [
      'Jeep safari (2 rounds)',
      'Expert naturalist',
      'Binoculars',
      'Park entry fees',
      'Refreshments',
    ],
    minAge: 6,
    imageUrl: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
  },
  {
    name: 'Hot Air Balloon Ride',
    location: 'Jaipur, Rajasthan',
    price: 8999,
    description:
      'Soar above the Pink City and witness stunning sunrise views of palaces, forts, and the Aravalli hills from a hot air balloon.',
    includes: [
      '1-hour balloon flight',
      'Champagne celebration',
      'Flight certificate',
      'Hotel pickup & drop',
      'Breakfast',
    ],
    minAge: 5,
    imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
  },
  {
    name: 'Yoga & Meditation Retreat',
    location: 'Rishikesh, Uttarakhand',
    price: 2999,
    description:
      'Rejuvenate your mind and body with guided yoga sessions by the Ganges, meditation, and ayurvedic meals.',
    includes: [
      '2 yoga sessions',
      'Meditation class',
      'Ayurvedic lunch',
      'Herbal tea',
      'Wellness consultation',
    ],
    minAge: 15,
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
  },
]

const generateSlots = (experienceId: string) => {
  const slots: any = []
  const today = new Date()
  const times = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM']

  // Generate slots for next 14 days
  for (let i = 0; i < 14; i++) {
    const slotDate = new Date(today)
    slotDate.setDate(today.getDate() + i)
    slotDate.setHours(0, 0, 0, 0)

    // Generate 3-5 random time slots per day
    const numSlots = Math.floor(Math.random() * 3) + 3
    const shuffledTimes = times.sort(() => Math.random() - 0.5).slice(0, numSlots)

    shuffledTimes.forEach(time => {
      const capacity = 5
      const booked = Math.floor(Math.random() * capacity * 0.5) // 0-50% booked
      const isSoldOut = booked >= capacity

      slots.push({
        experience: experienceId,
        date: slotDate,
        time: time,
        capacity: 5,
        booked: booked,
        isSoldOut: isSoldOut,
      })
    })
  }

  return slots
}

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = config.MONGO_URI!
    await mongoose.connect(mongoUri)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await Experience.deleteMany({})
    await Slot.deleteMany({})
    await Booking.deleteMany({})
    console.log('✅ Existing data cleared')

    // Seed experiences
    console.log('🌱 Seeding experiences...')
    const createdExperiences = await Experience.insertMany(experiences)
    console.log(`✅ ${createdExperiences.length} experiences created`)

    // Seed slots for each experience
    console.log('🌱 Seeding slots...')
    let totalSlots = 0
    for (const experience of createdExperiences) {
      const slots = generateSlots(experience.id)
      await Slot.insertMany(slots)
      totalSlots += slots.length
    }
    console.log(`✅ ${totalSlots} slots created`)

    // Create sample bookings
    console.log('🌱 Seeding sample bookings...')
    const sampleBookings: any = []

    for (let i = 0; i < 5; i++) {
      const randomExperience =
        createdExperiences[Math.floor(Math.random() * createdExperiences.length)]
      const experienceSlots = await Slot.find({
        experience: randomExperience._id,
        booked: { $gt: 0 },
      }).limit(1)

      if (experienceSlots.length > 0) {
        const slot = experienceSlots[0]
        const quantity = Math.floor(Math.random() * 3) + 1
        const subtotal = randomExperience.price * quantity
        const taxes = Math.round(subtotal * 0.18) // 18% tax
        const totalAmount = subtotal + taxes

        const refId = `BK-${nanoid(10).toUpperCase()}`

        sampleBookings.push({
          refId: refId,
          fullName: ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Reddy', 'Vikram Singh'][i],
          email: [
            'rahul@example.com',
            'priya@example.com',
            'amit@example.com',
            'sneha@example.com',
            'vikram@example.com',
          ][i],
          quantity: quantity,
          subtotal: subtotal,
          taxes: taxes,
          totalAmount: totalAmount,
          promoCodeUsed: i % 2 === 0 ? 'SAVE10' : undefined,
          slot: slot._id,
          experience: randomExperience._id,
        })
      }
    }

    if (sampleBookings.length > 0) {
      await Booking.insertMany(sampleBookings)
      console.log(`✅ ${sampleBookings.length} sample bookings created`)
    }

    console.log('\n🎉 Database seeded successfully!')
    console.log('\n📊 Summary:')
    console.log(`   • ${createdExperiences.length} Experiences`)
    console.log(`   • ${totalSlots} Slots`)
    console.log(`   • ${sampleBookings.length} Bookings`)
    console.log('\n✨ Available Promo Codes:')
    console.log('   • SAVE10 - 10% off (max ₹1000)')
    console.log('   • FLAT100 - ₹100 off (min ₹500)')
    console.log('   • WELCOME20 - 20% off (min ₹1000, max ₹500)')
    console.log('   • SAVE50 - ₹50 off (min ₹300)')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  } finally {
    await mongoose.connection.close()
    console.log('\n👋 Database connection closed')
    process.exit(0)
  }
}

// Run the seed function
seedDatabase()
