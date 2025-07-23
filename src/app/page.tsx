import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Menu, Search, User, ShoppingCart, Star, ChevronDown, Globe, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-black">Iscan</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <div className="relative group">
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  Products
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <a href="#" className="text-gray-600 hover:text-gray-900">Business</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Blogs</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Tutorials</a>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm">English</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <Search className="h-5 w-5 text-gray-600" />
              <User className="h-5 w-5 text-gray-600" />
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Tap Into Advanced Networking:<br />
            The Future of Digital Business Cards
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={'/admin'} >
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg">Admins Dashboard</Button>
            </Link>
            <Link href={"/individuals"} >
              <Button variant="outline" className="border-gray-300 text-gray-700 px-8 py-3 rounded-full text-lg">Individuals Dashboard</Button>
            </Link>
          </div>

          {/* Phone Mockups */}
          <div className="relative max-w-4xl mx-auto">
            <img
              src="https://ext.same-assets.com/2757501231/39199702.png"
              alt="App mockups showing digital business card interface"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <span className="text-sm font-medium">booking.com</span>
            <span className="text-sm font-medium">CSK</span>
            <span className="text-sm font-medium">ICOM</span>
            <span className="text-sm font-medium">Mondelez</span>
          </div>
        </div>
      </section>

      {/* What is a digital business card section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What is a digital business card?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                In today's fast-paced business world, our Digital Business Card represents the cutting edge of
                networking. It's an eco-friendly, tech-savvy solution, enabling you to share your contact information
                instantly and effortlessly. Powered by Near Field Communication (NFC) and QR code technology, our
                digital card transforms the traditional business card into a dynamic, interactive experience.
              </p>
              <Button className="bg-black text-white px-6 py-3 rounded-lg">
                Learn more
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://ext.same-assets.com/2757501231/1363686481.png"
                alt="Hand holding phone with digital business card"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Features</h2>
          <p className="text-xl text-gray-600 mb-12">Get to know more about our solution</p>

          <Button className="bg-black text-white px-8 py-3 rounded-full mb-16">
            Download The App Now
          </Button>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Contact Management */}
            <Card className="p-8 text-left">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-2">Contact Management</h3>
                <p className="text-gray-600 mb-4">Streamline and enhance networking efficiency.</p>
                <img
                  src="https://ext.same-assets.com/2757501231/2696148351.png"
                  alt="Contact management interface"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Scan Physical Business Cards */}
            <Card className="p-8 text-left">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-2">Scan Physical Business Cards</h3>
                <p className="text-gray-600 mb-4">Enables users to digitize traditional business cards using their smartphone's camera.</p>
                <img
                  src="https://ext.same-assets.com/2757501231/2867107183.png"
                  alt="Scanning physical business cards"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Personalized Profiles */}
            <Card className="p-8 text-left">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-2">Personalized Profiles</h3>
                <p className="text-gray-600 mb-4">Allows users to create highly customizable digital profiles that go beyond basic contact information.</p>
                <img
                  src="https://ext.same-assets.com/2757501231/185409372.png"
                  alt="Personalized profile interface"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Second Row of Features */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Customized Sharing */}
            <Card className="p-8 text-left">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-2">Customized Sharing</h3>
                <p className="text-gray-600 mb-4">Tailor the information you share based on the specific context or recipient.</p>
                <img
                  src="https://ext.same-assets.com/2757501231/473797135.png"
                  alt="Customized sharing options"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Product Management */}
            <Card className="p-8 text-left">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-2">Product Management</h3>
                <p className="text-gray-600 mb-4">Connect your products to let your contact and get more in-features to come.</p>
                <img
                  src="https://ext.same-assets.com/2757501231/823911752.png"
                  alt="Product management interface"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Track Your Performance */}
            <Card className="p-8 text-left">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-2">Track Your Performance</h3>
                <p className="text-gray-600 mb-4">Stay ahead by monitoring your performance metrics, views, and taps.</p>
                <img
                  src="https://ext.same-assets.com/2757501231/2057946902.png"
                  alt="Performance tracking dashboard"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Be a part of the largest community in<br />MENA region.
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-xl font-semibold mb-2">Organizations</div>
              <p className="text-purple-100">
                Many companies trust our technology in digitalizing their business cards.
              </p>
            </div>

            <div>
              <div className="text-5xl font-bold mb-2">1,000,000+</div>
              <div className="text-xl font-semibold mb-2">Interactions Made</div>
              <p className="text-purple-100">
                Connections made everyday on our app, makes it easy for people to share their info.
              </p>
            </div>

            <div>
              <div className="text-5xl font-bold mb-2">65+</div>
              <div className="text-xl font-semibold mb-2">Countries</div>
              <p className="text-purple-100">
                People around the world trust our technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Track Your Performance Detailed Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-4xl mx-auto p-12 rounded-3xl">
            <CardContent className="p-0">
              <h2 className="text-4xl font-bold mb-4">Track Your Performance</h2>
              <p className="text-gray-600 text-lg mb-8">
                Stay ahead by monitoring your performance metrics, views and taps.
              </p>

              <img
                src="https://ext.same-assets.com/2757501231/3704962277.png"
                alt="Performance tracking interface with analytics"
                className="w-full h-auto rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">How it works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-purple-600 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-lg">tap.</span>
              </div>
              <h3 className="text-xl font-bold">Get a tap product that suits you</h3>
              <p className="text-gray-300">Select from variety of different products.</p>
              <Button variant="link" className="text-purple-400 p-0">View Collections</Button>
            </div>

            <div className="space-y-4">
              <div className="w-20 h-20 bg-white rounded-lg mx-auto flex items-center justify-center">
                <span className="text-black font-bold text-lg">📱</span>
              </div>
              <h3 className="text-xl font-bold">Create Your Free Profile Now</h3>
              <p className="text-gray-300">Download our free app and create your profile, add your info and your social media accounts for free!</p>
              <Button variant="link" className="text-purple-400 p-0">Download App</Button>
            </div>

            <div className="space-y-4">
              <div className="w-20 h-20 bg-white rounded-lg mx-auto flex items-center justify-center">
                <span className="text-black font-bold text-lg">⚡</span>
              </div>
              <h3 className="text-xl font-bold">Activate Your Product</h3>
              <p className="text-gray-300">Whenever you receive your product, activate it from the app.</p>
            </div>

            <div className="space-y-4">
              <div className="w-20 h-20 bg-white rounded-lg mx-auto flex items-center justify-center">
                <span className="text-black font-bold text-lg">🤝</span>
              </div>
              <h3 className="text-xl font-bold">Start Networking</h3>
              <p className="text-gray-300">You can now share your info to others with ease!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-purple-600 text-white mb-4">New</Badge>
            <h2 className="text-4xl font-bold mb-4">Tap NFC Prestige Card - Custom Embossed names</h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-2xl font-bold">$34 USD</span>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">4.9</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <img
                src="https://ext.same-assets.com/2757501231/2970124914.jpeg"
                alt="Black NFC Prestige Card"
                className="w-full h-auto rounded-lg"
              />

              {/* Color options */}
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium">Color: Black</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-black rounded-full border-2 border-gray-300"></div>
                  <div className="w-8 h-8 bg-pink-300 rounded-full"></div>
                  <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-300"></div>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-4">
                <Input placeholder="Write Your Name" />
                <Input placeholder="Write Your Title (Optional)" />

                <div className="space-y-2">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span>1</span>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  Add to cart
                </Button>
                <Button className="w-full bg-black text-white">
                  Buy with Pay
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Discover the seamless blend of elegance and connectivity with the <strong>NFC Prestige Card</strong>.
                Tailored for those who make no compromises on quality and convenience, this card places your identity
                at the forefront with exquisite embossing.
              </p>

              <p className="text-gray-600">
                It's more than just sharing contact information; it's about making an unforgettable impression.
              </p>

              <p className="text-sm text-gray-500 italic">
                <strong>Note:</strong> This is a customized product, so Cash on Delivery is not available.
                Online payment is required to confirm your order. All other products are still available with
                Cash on Delivery as usual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured collection</h2>
            <Button variant="link" className="text-gray-600">View all →</Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Product 1 */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="https://ext.same-assets.com/2757501231/2301679572.png"
                  alt="Tap NFC Leather Keychain"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Tap NFC Leather Keychain - Burgundy - Share Instantly</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-yellow-500">5.0</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <span className="font-bold">$20 USD</span>
                </div>
              </CardContent>
            </Card>

            {/* Product 2 */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="https://ext.same-assets.com/2757501231/473625082.png"
                  alt="Pocket NFC Cardholder"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Pocket™ - World's Most Advanced NFC Cardholder - Havan</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-yellow-500">4.9</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <span className="font-bold">$40 USD</span>
                </div>
              </CardContent>
            </Card>

            {/* Product 3 */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="https://ext.same-assets.com/2757501231/3726827461.png"
                  alt="GoWrist Apple Watch"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">GoWrist™ - Your On-The-Go Digital Business Card - Compatible with Apple Watch</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-yellow-500">5.0</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <span className="font-bold">$30 USD</span>
                </div>
              </CardContent>
            </Card>

            {/* Product 4 */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="https://ext.same-assets.com/2757501231/3561760095.png"
                  alt="Tap NFC Sticker"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Tap NFC Sticker - Share Everything With A Tap - White</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-yellow-500">5.0</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <span className="font-bold">$12 USD</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-red-500 text-white">AE</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex text-yellow-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="font-semibold">Assem Emam</div>
                    <div className="text-sm text-gray-600">CEO, ElCoach, Inc.</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  I've never been a big fan of business cards in general, but I've had the chance to attend
                  two major events relying solely on Tap's card, I'm now a big fan! The experience was
                  seamless and super efficient. Thank you, Tap!
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-blue-500 text-white">AE</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex text-yellow-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="font-semibold">Amr elmeligui</div>
                    <div className="text-sm text-gray-600">Marketing executive, Arab Developers holding</div>
                  </div>
                </div>
                <p className="text-gray-600">Perfect and beyond</p>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-green-500 text-white">MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex text-yellow-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="font-semibold">Marwan Ramadan</div>
                    <div className="text-sm text-gray-600">CEO, HITCH</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  I love the whole experience and how it is easy to share your info to others, great work guys!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Interested in our digital solutions for your company?
            </h2>
            <p className="text-gray-300 mb-8">
              Send us a message now, and we'll get back to you ASAP.
            </p>

            <Card className="bg-white text-black p-8">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Input placeholder="Name" />
                  <Input placeholder="E-mail" />
                </div>
                <Input placeholder="Company Name" className="mb-4" />
                <Input placeholder="Number of Employees" className="mb-4" />
                <Textarea placeholder="Message" rows={4} className="mb-6" />
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Send message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is tap?</AccordionTrigger>
                <AccordionContent>
                  Tap is advancing your networking game by allowing you to share it all; your social media,
                  contact info, files, and so much more. Tap uses the NFC technology that is integrated into
                  many forms such as cards, stickers, and keychains.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How does it work?</AccordionTrigger>
                <AccordionContent>
                  An integrated NFC chip in Tap Products wirelessly transmits data to your smartphone.
                  Push notifications appear on others phones to begin the sharing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Do other people need to download the app to receive my info?</AccordionTrigger>
                <AccordionContent>
                  No, other people don't need an app to receive your data. If they device has NFC chip you can
                  simply tap your product to their device and your profile will instantly pop-up.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Tapping to older iPhones</AccordionTrigger>
                <AccordionContent>
                  Tap Products are compatible with almost all iPhones, including the iPhone XR, XS, XS Max,
                  11, 11 Pro, 11 Pro 12, 12pro. 13, 13 pro, SE.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>My phone isn't compatible</AccordionTrigger>
                <AccordionContent>
                  If your device doesn't have NFC, you can still use the QR code option available on all
                  Tap products.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Our customer support is available Saturday to Thursday: 11am-5:30pm.<br />
              Average answer time: 24h
            </p>
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <img src="https://ext.same-assets.com/2757501231/2018846082.png" alt="App Store" className="h-12" />
            <img src="https://ext.same-assets.com/2757501231/1938795951.png" alt="Google Play" className="h-12" />
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Download Our Free App Now!
          </h2>

          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full">
            Download Now!
          </Button>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Blog</h2>
            <Button variant="link" className="text-gray-600">View all →</Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="https://ext.same-assets.com/2757501231/2509172943.png"
                  alt="Digital Business Cards for Teams"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <Badge className="bg-purple-600 text-white mb-4">Digital Business Cards for Teams.</Badge>
                  <h3 className="text-xl font-bold mb-2">
                    The Ultimate Guide to Digital Business Cards for Teams: Features, Benefits, and Setup
                  </h3>
                  <p className="text-gray-600">
                    Explore key features, top benefits. See how Tap Teams makes team networking easy and on-brand.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="https://ext.same-assets.com/2757501231/3063334030.png"
                  alt="CRM Integration"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <Badge className="bg-purple-600 text-white mb-4">Turn visitors into qualified leads</Badge>
                  <h3 className="text-xl font-bold mb-2">
                    How Digital Business Cards with CRM Integration Supercharge Your Sales Team
                  </h3>
                  <p className="text-gray-600">
                    Using our collect leads form, every visitor is a potential client
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About Tap */}
            <div>
              <h3 className="font-bold mb-4">About Tap</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                At tap - Digital Business Card, we redefine networking with our innovative NFC and QR code technology.
                We empower professionals to connect instantly and memorably. Embrace the future of networking with us.
              </p>
            </div>

            {/* Main menu */}
            <div>
              <h3 className="font-bold mb-4">Main menu</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Products</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Business</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blogs</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Tutorials</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Refund Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Copyright Declaration</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold mb-4">Sign up for new updates and offers.</h3>
              <div className="flex">
                <Input
                  placeholder="E-mail"
                  className="rounded-r-none bg-gray-800 border-gray-700 text-white"
                />
                <Button className="rounded-l-none bg-purple-600 hover:bg-purple-700">
                  →
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024, Tap. Powered by Shopify
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
