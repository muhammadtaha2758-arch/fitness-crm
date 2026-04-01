# Fitness Suite CRM

A comprehensive fitness business management system designed to handle all aspects of gym/fitness center operations including member management, workout planning, nutrition tracking, appointments, challenges, and business analytics.

## 🎯 Features

### Core Functionality
- **Member Management** - Complete member lifecycle management with profiles, memberships, and tracking
- **Coach Management** - Manage coaches, assignments, and coaching relationships
- **Workout Library** - Create, manage, and assign workout plans with video demonstrations
- **Nutrition Hub** - Meal planning, nutrition tracking, and dietary assessments
- **Appointments** - Schedule and manage appointments with coaches and members
- **Challenges** - Create and manage fitness challenges for members
- **Community** - Social features for member engagement
- **Business Analytics** - Comprehensive reporting and analytics dashboard
- **Check-in System** - Member check-in tracking and management
- **Invoicing & Payments** - Integrated billing with Stripe payment gateway
- **Mobile Support** - Mobile-friendly interface and API for mobile apps

### Key Capabilities
- Multi-gym support with gym-specific configurations
- Role-based permissions and access control
- Real-time notifications and email communications
- Video library with thumbnail generation
- Progress tracking and photo comparisons
- Subscription management with Stripe integration
- Multi-language support

## 🛠️ Technology Stack

### Backend
- **Framework**: Laravel 8.x
- **PHP**: 7.3+ or 8.0+
- **Database**: MySQL/MariaDB
- **Payment Gateway**: Stripe (via Laravel Cashier)
- **SMS**: Twilio, Infobip, Nexmo (Vonage)
- **Image Processing**: Intervention Image, FFmpeg

### Frontend
- **Framework**: Vue.js 2.6
- **UI Library**: Bootstrap 4.6, BootstrapVue
- **Styling**: SCSS
- **Build Tool**: Laravel Mix (Webpack)
- **State Management**: Vuex
- **Form Validation**: VeeValidate
- **Tables**: vue-good-table
- **Calendar**: FullCalendar, v-calendar

## 📋 Requirements

### Server Requirements
- PHP >= 7.3.0 or >= 8.0.0
- MySQL >= 5.7 or MariaDB >= 10.2
- Composer
- Node.js >= 14.x and npm
- FFmpeg (for video thumbnail generation)

### PHP Extensions
- OpenSSL
- PDO
- Mbstring
- Tokenizer
- XML
- Ctype
- JSON
- BCMath
- Fileinfo
- GD or Imagick

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd crm_frontend_backend
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install Node Dependencies
```bash
npm install
```

### 4. Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` file with your database and application settings:
```env
APP_NAME="Fitness Suite CRM"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Stripe Configuration
STRIPE_KEY=your_stripe_key
STRIPE_SECRET=your_stripe_secret
CASHIER_SECRET=your_stripe_secret

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"
```

### 5. Database Setup
```bash
php artisan migrate
php artisan db:seed
```

### 6. Storage Link
```bash
php artisan storage:link
```

### 7. Build Frontend Assets

For development:
```bash
npm run dev
# or
npm run watch
```

For production:
```bash
npm run production
```

### 8. Generate Video Thumbnails (Optional)
```bash
php artisan videos:generate-thumbnails
```

## 🔧 Development

### Running the Application
```bash
php artisan serve
```

The application will be available at `http://localhost:8000`

### Running Tests
```bash
php artisan test
# or
vendor/bin/phpunit
```

### Available Artisan Commands
```bash
# Stripe Management
php artisan stripe:check-prices          # Validate Stripe price IDs
php artisan stripe:list-new-prices       # List recent Stripe prices
php artisan stripe:list-new-prices --all # List all Stripe prices

# Video Management
php artisan videos:generate-thumbnails  # Generate video thumbnails
php artisan videos:quick-thumbnails       # Quick thumbnail generation

# Database
php artisan migrate                      # Run migrations
php artisan db:seed                      # Seed database
php artisan db:seed --class=PlanSeeder   # Seed specific seeder
```

## 📁 Project Structure

```
crm_frontend_backend/
├── app/                    # Laravel application code
│   ├── Console/           # Artisan commands
│   ├── Http/              # Controllers, Middleware, Requests
│   ├── Models/            # Eloquent models
│   └── Services/          # Business logic services
├── database/
│   ├── migrations/        # Database migrations
│   └── seeders/          # Database seeders
├── docs/                  # Documentation
├── public/                # Public assets
│   ├── videos/           # Video files
│   └── thumbnails/       # Generated thumbnails
├── resources/
│   └── src/              # Vue.js frontend
│       ├── components/   # Vue components
│       ├── views/        # Vue pages
│       └── store/        # Vuex store
└── routes/               # Application routes
```

## 📚 Documentation

- [Complete Workflow Documentation](docs/CRM_WORKFLOW_DOCUMENTATION.md)
- [React Project API Documentation](docs/REACT_PROJECT_API_DOCUMENTATION.md)
- [Video Thumbnail System](docs/VIDEO_THUMBNAIL_SYSTEM.md)
- [Mobile API Documentation](docs/mobile-workout-api.md)

## 🔐 Default Credentials

After seeding, you can log in with the default admin credentials (check your database seeders for the actual credentials).

## 🎨 Frontend Development

The frontend uses Vue 2 with Bootstrap 4.6 and SCSS. Follow these guidelines:

- Use Bootstrap classes first before writing custom CSS
- All styling should be in SCSS with scoped styles
- Use Vuex for state management
- Follow the existing component structure

See the project's frontend development rules for more details.

## 🔄 Updates

To update the application:

1. Take a backup of your database and files
2. Pull the latest code
3. Run migrations: `php artisan migrate`
4. Rebuild assets: `npm run production`
5. Clear cache: `php artisan cache:clear`

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## 📝 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and feature requests, please refer to the documentation or contact the development team.

## 🔗 Related Projects

- React Landing Page (for public-facing subscription pages)
- Mobile Applications (iOS/Android)

---

**Version**: Current  
**Last Updated**: 2025  
**Maintained by**: Fitness Suite Development Team

