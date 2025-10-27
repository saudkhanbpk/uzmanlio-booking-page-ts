import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { ProviderProfile } from "@/components/types/booking.types"

function BlogsSection({ blogsData }: { blogsData: ProviderProfile['blogs'] }) {
    const [currentBlogCarouselIndex, setCurrentBlogCarouselIndex] = useState(0);

    const nextBlogCarousel = () => {
        if (currentBlogCarouselIndex + 3 < (blogsData?.length ?? 0)) {
            setCurrentBlogCarouselIndex(currentBlogCarouselIndex + 3);
        }
    };

    const prevBlogCarousel = () => {
        if (currentBlogCarouselIndex - 3 >= 0) {
            setCurrentBlogCarouselIndex(currentBlogCarouselIndex - 3);
        }
    };

    return (
        <>
            {/* Blog Posts Section */}
            <div className="mt-16 mb-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Yazıları</h2>
                    <p className="text-gray-600">Uzmanımızın paylaştığı faydalı içerikler</p>
                </div>

                <div className="relative">
                    <div className="grid md:grid-cols-3 gap-6">
                        {blogsData?.slice(currentBlogCarouselIndex, currentBlogCarouselIndex + 3).map((post) => (
                            <div key={post.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => window.open(post.url, "_blank")}
                            >
                                <div className="aspect-video bg-gray-200 overflow-hidden">
                                    <img src={post.coverImage || "/placeholder.svg"} alt={post.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-gray-900 line-clamp-2 leading-relaxed">{post.title}</h3>
                                    <div className="mt-3 flex items-center text-sm text-gray-500">
                                        <ExternalLink className="w-4 h-4 mr-1" />
                                        <span>Yazıyı oku</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel Navigation */}
                    {blogsData && blogsData.length > 3 && (
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <Button variant="outline" size="sm" onClick={prevBlogCarousel} disabled={currentBlogCarouselIndex === 0}
                                className="flex items-center gap-2 bg-transparent">
                                <ChevronLeft className="w-4 h-4" />
                                Önceki
                            </Button>
                            <span className="text-sm text-gray-500">
                                {Math.floor(currentBlogCarouselIndex / 3) + 1} / {Math.ceil(blogsData.length / 3)}
                            </span>
                            <Button variant="outline" size="sm" onClick={nextBlogCarousel} disabled={currentBlogCarouselIndex + 3 >=
                                blogsData.length}
                                className="flex items-center gap-2"
                            >
                                Sonraki
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


export default BlogsSection;
