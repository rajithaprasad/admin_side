import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

const Blogs = () => {
  const blogPosts = [
    {
      title: "10 Essential Tips for a Stress-Free House Move",
      excerpt: "Moving house doesn't have to be overwhelming. Follow our expert tips to make your next move smooth and efficient.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Moving Tips",
      image: "📦"
    },
    {
      title: "How to Pack Fragile Items for Safe Transport",
      excerpt: "Learn the professional techniques for packing delicate items to ensure they arrive at your new home in perfect condition.",
      author: "Mike Chen",
      date: "March 10, 2024", 
      readTime: "7 min read",
      category: "Packing Guide",
      image: "🏺"
    },
    {
      title: "Office Relocation Checklist: A Complete Guide",
      excerpt: "Planning an office move? Our comprehensive checklist will help you coordinate every aspect of your business relocation.",
      author: "David Thompson",
      date: "March 5, 2024",
      readTime: "10 min read", 
      category: "Business Moving",
      image: "🏢"
    },
    {
      title: "The Ultimate Guide to Choosing the Right Van Size",
      excerpt: "Not sure which van size you need? Our guide breaks down the different options and helps you make the right choice.",
      author: "Emma Wilson",
      date: "February 28, 2024",
      readTime: "6 min read",
      category: "Van Selection",
      image: "🚐"
    },
    {
      title: "Sustainable Moving: Eco-Friendly Practices",
      excerpt: "Discover how to make your move more environmentally friendly with our sustainable moving tips and practices.",
      author: "Lisa Green",
      date: "February 20, 2024",
      readTime: "8 min read",
      category: "Sustainability", 
      image: "🌱"
    },
    {
      title: "Student Moving Guide: Budget-Friendly Tips",
      excerpt: "Moving on a student budget? Learn how to relocate affordably without compromising on quality or safety.",
      author: "Tom Baker",
      date: "February 15, 2024",
      readTime: "5 min read",
      category: "Student Moving",
      image: "🎓"
    }
  ];

  const categories = [
    "All Posts",
    "Moving Tips", 
    "Packing Guide",
    "Business Moving",
    "Van Selection",
    "Sustainability",
    "Student Moving"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">MoveXpress Blog</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Expert advice, tips, and insights from the moving and delivery professionals
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="bg-gradient-accent flex items-center justify-center text-6xl p-12">
                    {blogPosts[0].image}
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="text-sm text-primary font-semibold mb-2">FEATURED POST</div>
                    <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
                    <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{blogPosts[0].author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{blogPosts[0].date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{blogPosts[0].readTime}</span>
                      </div>
                    </div>
                    <Button className="w-fit">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="bg-gradient-accent flex items-center justify-center text-4xl h-48">
                    {post.image}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-sm text-primary font-semibold mb-2">{post.category}</div>
                    <h3 className="text-lg font-semibold mb-3">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest moving tips, industry insights, and company updates
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-foreground bg-background border-0 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <Button variant="cta" size="lg" className="rounded-full px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;