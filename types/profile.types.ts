export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  age: number | null;
  gender: 'male' | 'female' | null;
  city: string | null;
  country: string | null;
  photo_url: string | null;
  smoking: string | null;
  drinking: string | null;
  diet: string | null;
  prayer: string | null;
  religiosity: string | null;
  onboarding_completed: boolean;
  profile_verified: boolean;
  bio: string | null;
  marriage_timeline: string | null;
  want_children: string | null;
  willing_to_relocate: boolean | null;
  phone_verified: boolean;

}