<script setup>
const
  dry = [
    {
      title: "Flyer 1: Planning and Variety Selection",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_1_planning-and-variety-selection.pdf?alt=media&token=6f5b509a-8c82-49cf-8212-885da59a9a4f&_gl=1*oxck8*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDkwMC4zOS4wLjA."
    },
    {
      title: "Flyer 2: Land Preparation for Dry Direct Seeding",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_2_land-preparation-for-wet-direct-seeding.pdf?alt=media&token=92e88ee3-d19c-436f-a1b9-25b95f702873&_gl=1*1fpcfs1*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDk2Ni4zNy4wLjA."
    },
    {
      title: "Flyer 3: Crop Establishment - Dry Direct Seeding",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_3_crop-establishment-dry-direct-seeding.pdf?alt=media&token=e0160acc-984b-4156-9023-2d6cd6fab4e5&_gl=1*1l9ilgc*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDcxNy4xOS4wLjA."
    },
    {
      title: "Flyer 4: Water Management",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_4_water-management.pdf?alt=media&token=187f8b13-48d3-4b69-b2b0-d453aebbbb45&_gl=1*ef62ne*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDg3OS42MC4wLjA."
    },
    {
      title: "Flyer 5: Management of Pests and Diseases",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_5_management-of-pests-and-diseases.pdf?alt=media&token=26237694-dee5-4971-8d98-c1ab1e31fe25&_gl=1*1wnkiis*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDY5MS40NS4wLjA."
    },
    {
      title: "Flyer 6: Weed Management",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_7_weed-management.pdf?alt=media&token=37181f27-2d71-4750-979c-5026c8293a97&_gl=1*k8q3a7*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDk0My42MC4wLjA."
    },
    {
      title: "Flyer 7: Nutrient Management",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_6_nutrient-management.pdf?alt=media&token=4e521123-d2a0-4fd1-95b3-bb3a1f5acd98&_gl=1*1nhwy5q*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDkyMC4xOS4wLjA."
    },
    {
      title: "Flyer 8: Harvest and Post-Harvest",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_8_harvest_and_postharvest.pdf?alt=media&token=b32ca6f4-73fa-4fbe-bfb4-71729c75b121&_gl=1*cm3jru*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDY3Ni42MC4wLjA."
    },
    {
      title: "Flyer 9: Benefits of Mechanized Direct Seeded Rice (mDSR) with Best Agronomic Practices",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_9_benefits-of-mdsr.pdf?alt=media&token=2b6aa50c-d9a3-4931-a641-e7e397f4c6d6&_gl=1*owq0kf*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDU4My40OS4wLjA."
    },
    {
      title: "CARDI Soil Specific Recommendations",
      ext: "jpg",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230913_cardi-fertilizer-recommendations.jpg?alt=media&token=c464960c-933c-4a15-be61-aecc72acd17d"
    },
    {
      title: "Modified Fertilizer Management",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230913_modified-fertilizer-recommendation.pdf?alt=media&token=ac5d5645-0b77-42ef-b2de-47e784bddc31"
    },
    {
      title: "Rice Varieties and Seed Rate",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230913_rice-varieties-and-seed-rate.pdf?alt=media&token=48dfe1ad-0dff-4844-b786-7f168faad80f"
    },
    {
      title: "Angkor Rice Seeder with 2 wheel tractor",
      ext: "jpg",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230913_angkor-seeder-2-wheel.jpg?alt=media&token=148b5073-727d-41e2-b882-f9d68c7e9b0d"
    },
    {
      title: "Angkor Rice Seeder with 4 wheel tractor",
      ext: "jpg",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230913_angkor-seeder-4-wheel.jpg?alt=media&token=c5e95f06-9e54-4bba-9092-cd70a848cf0e"
    },
  ],
  wet = [
    {
      title: "Flyer 1: Planning and Variety Selection",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_1_planning-and-variety-selection.pdf?alt=media&token=6f5b509a-8c82-49cf-8212-885da59a9a4f&_gl=1*oxck8*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDkwMC4zOS4wLjA."
    },
    {
      title: "Flyer 2: Land Preparation for Wet Direct Seeding",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230919_flyer-2_wet.pdf?alt=media&token=3d009761-0540-4c69-ac80-84748a151644"
    },
    {
      title: "Flyer 3: Crop Establishment - Wet Direct Seeding",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_3_crop-establishment-wet-direct-seeding.pdf?alt=media&token=1bd0c3fd-5953-4335-9556-93596cb3c87e&_gl=1*91s3fy*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDgxOC42MC4wLjA."
    },
    {
      title: "Flyer 4: Water Management",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_4_water-management.pdf?alt=media&token=187f8b13-48d3-4b69-b2b0-d453aebbbb45&_gl=1*ef62ne*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDg3OS42MC4wLjA."
    },
    {
      title: "Flyer 5: Management of Pests and Diseases",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_5_management-of-pests-and-diseases.pdf?alt=media&token=26237694-dee5-4971-8d98-c1ab1e31fe25&_gl=1*1wnkiis*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDY5MS40NS4wLjA."
    },
    {
      title: "Flyer 6: Weed Management",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_7_weed-management.pdf?alt=media&token=37181f27-2d71-4750-979c-5026c8293a97&_gl=1*k8q3a7*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDk0My42MC4wLjA."
    },
    {
      title: "Flyer 7: Nutrient Management",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_6_nutrient-management.pdf?alt=media&token=4e521123-d2a0-4fd1-95b3-bb3a1f5acd98&_gl=1*1nhwy5q*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDkyMC4xOS4wLjA."
    },
    {
      title: "Flyer 8: Harvest and Post-Harvest",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_8_harvest_and_postharvest.pdf?alt=media&token=b32ca6f4-73fa-4fbe-bfb4-71729c75b121&_gl=1*cm3jru*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDY3Ni42MC4wLjA."
    },
    {
      title: "Flyer 9: Benefits of Mechanized Direct Seeded Rice (mDSR) with Best Agronomic Practices",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F231009_9_benefits-of-mdsr.pdf?alt=media&token=2b6aa50c-d9a3-4931-a641-e7e397f4c6d6&_gl=1*owq0kf*_ga*MTgxMjIzMTM1Ni4xNjk3NDM2MTkw*_ga_CW55HF8NVT*MTY5NzUyMDU3Mi4yLjEuMTY5NzUyMDU4My40OS4wLjA."
    },
    {
      title: "Wet DSR Basic Agronomic Recommendations",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230913_wet-dsr-basic-agronomic-recommendations.pdf?alt=media&token=4516c658-d1d2-442b-8c65-e83c3c602dc8"
    },
    {
      title: "CARDI Soil Specific Recommendations",
      ext: "jpg",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230913_cardi-fertilizer-recommendations.jpg?alt=media&token=c464960c-933c-4a15-be61-aecc72acd17d"
    },
    {
      title: "Modified Fertilizer Management",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230913_modified-fertilizer-recommendation.pdf?alt=media&token=ac5d5645-0b77-42ef-b2de-47e784bddc31"
    },
    {
      title: "Rice Varieties and Seed Rate",
      ext: "pdf",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230913_rice-varieties-and-seed-rate.pdf?alt=media&token=48dfe1ad-0dff-4844-b786-7f168faad80f"
    },
    {
      title: "Angkor Rice Seeder with 2 wheel tractor",
      ext: "jpg",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230913_angkor-seeder-2-wheel.jpg?alt=media&token=148b5073-727d-41e2-b882-f9d68c7e9b0d"
    },
    {
      title: "Angkor Rice Seeder with 4 wheel tractor",
      ext: "jpg",
      by: "IRRI-Cambodia",
      url: "https://firebasestorage.googleapis.com/v0/b/cambodia-mdsr.appspot.com/o/info-hub%2F230913_angkor-seeder-4-wheel.jpg?alt=media&token=c5e95f06-9e54-4bba-9092-cd70a848cf0e"
    }
  ];
</script>

<template>
  <v-container class="justify-start" fluid>
    <v-row>
      <v-col>
        <div class="h-300-heavy text-primary-neutral-900">Knowledge Hub</div>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <InfoSlider :files="both" title="Recommendations for both Wet and Dry Seeding" />
      </v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <InfoSlider :files="wet" title="Recommendations for Wet Seeding" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <InfoSlider :files="dry" title="Recommendations for Dry Seeding" />
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <InfoSlider :files="misc" title="Miscellaneous" />
      </v-col>
    </v-row> -->
  </v-container>
</template>
