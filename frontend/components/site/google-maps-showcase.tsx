import { Camera, ExternalLink, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mapUrl = "https://maps.app.goo.gl/Bt4KS8WU1Szv6M2NA";
const embedUrl =
  "https://www.google.com/maps?q=2-122%2F181%2F1%2C%20Sriram%20Nagar%2C%20Shamshiguda%2C%20Kukatpally%2C%20Hyderabad%20500072&output=embed";

export function GoogleMapsShowcase({ compact = false }: { compact?: boolean }) {
  return (
    <Card className="animate-float-slow overflow-hidden border-amber-300/40 bg-white/95 text-slate-950 shadow-2xl">
      <div className={compact ? "h-72" : "h-80"}>
        <iframe
          src={embedUrl}
          title="VJ International Certifications Google Maps location"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <CardContent className="p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="font-extrabold">VJ International Certifications</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              2-122/181/1, Sriram Nagar, Shamshiguda, Kukatpally, Hyderabad 500072
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild>
            <a href={mapUrl} target="_blank" rel="noreferrer">
              <Navigation className="h-4 w-4" /> Open map
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={mapUrl} target="_blank" rel="noreferrer">
              <Camera className="h-4 w-4" /> View Google photos
            </a>
          </Button>
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <ExternalLink className="h-3.5 w-3.5" />
          Photos open from the official Google Maps business profile.
        </p>
      </CardContent>
    </Card>
  );
}
