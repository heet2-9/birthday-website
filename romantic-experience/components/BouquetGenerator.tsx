import React, { useState, useMemo, useCallback } from 'react';
import { FlowerCatalogItem, WrapStyle, RibbonStyle } from '@/types/bouquetEngine';
import { BouquetState } from '@/types/bouquet';
import { generateRealisticBouquetLayout } from '@/lib/utils';
import { StudioBouquetCanvas } from './StudioBouquetCanvas';
import { FlowerCard } from './FlowerCard';
import { safeConfetti } from '@/lib/confetti';

// Existing project flower catalog mapped with realistic dimensions
const FLORAL_CATALOG: FlowerCatalogItem[] = [
    {
        id: 'red-rose',
        name: 'Velvet Rose',
        meaning: 'Endless Passion',
        symbolism: 'Symbolizes deep romance, devotion, and timeless grace.',
        imageSrc: '/assets/flowers/red-rose.webp',
        tier: 'large',
        realDiameterMm: 95,
        stemThicknessPx: 5,
    },
    {
        id: 'sunflower',
        name: 'Sunflower',
        meaning: 'Prosperity & Romance',
        symbolism: 'Embodiment of delicate charm, fortune, and soft affection.',
        imageSrc: '/assets/flowers/sunflower.webp',
        tier: 'hero',
        realDiameterMm: 115,
        stemThicknessPx: 6,
    },
    {
        id: 'white-lily',
        name: 'Royal Lily',
        meaning: 'Purity of Heart',
        symbolism: 'Reflects commitment, majesty, and unconditional devotion.',
        imageSrc: '/assets/flowers/white-lily.webp',
        tier: 'medium',
        realDiameterMm: 85,
        stemThicknessPx: 4,
    },
    {
        id: 'lavender',
        name: 'French Lavender',
        meaning: 'Serenity & Faith',
        symbolism: 'Fills the bouquet with peaceful, calming, and eternal affection.',
        imageSrc: '/assets/flowers/lavender.webp',
        tier: 'small',
        realDiameterMm: 50,
        stemThicknessPx: 3,
    },
];

export default function BouquetGenerator() {
    const [counts, setCounts] = useState<BouquetState>({});

    const [wrapStyle] = useState<WrapStyle>('korean-matte-black');
    const [ribbonStyle] = useState<RibbonStyle>('satin-black');

    const handleUpdateQuantity = useCallback((id: string, delta: number) => {
        setCounts((prev) => {
            const current = prev[id] || 0;
            const next = Math.max(0, Math.min(10, current + delta));
            return { ...prev, [id]: next };
        });
    }, []);

    const handleReset = useCallback(() => {
        setCounts({});
    }, []);

    const handleBloomCelebration = useCallback(() => {
        safeConfetti({
            particleCount: 80,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#ff2a85', '#ffffff', '#ff73b3'],
        });
    }, []);

    // Compute 3D Florist Composition in Real-Time
    const composition = useMemo(
        () => generateRealisticBouquetLayout(counts, FLORAL_CATALOG, wrapStyle),
        [counts, wrapStyle]
    );

    return (
        <section className="w-full min-h-screen bg-[#030303] text-white py-16 px-4 sm:px-8 select-none">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Luxury Header */}
                <div className="text-center space-y-3">
                    <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-amber-200 tracking-tight">
                        Aarya&apos;s <span className="italic text-[#ff2a85]">Haute Couture</span> Atelier
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-neutral-400 uppercase tracking-widest">
                        Compose a bespoke florist bouquet wrapped in luxury matte paper
                    </p>
                </div>

                {/* Workspace Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    {/* Left Canvas: Live Viewport */}
                    <div className="lg:col-span-7 w-full flex flex-col items-center">
                        <StudioBouquetCanvas
                            blooms={composition.blooms}
                            stems={composition.stems}
                            tiePointY={composition.tiePointY}
                            wrapStyle={wrapStyle}
                            ribbonStyle={ribbonStyle}
                            autoBabysBreathCount={composition.autoBabysBreathCount}
                        />

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                            <button
                                onClick={handleBloomCelebration}
                                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#ff2a85] to-rose-700 text-white font-serif text-sm font-semibold tracking-wider hover:shadow-[0_0_25px_rgba(255,42,133,0.5)] transition-all active:scale-95"
                            >
                                Bloom Celebration ✨
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                            >
                                Reset Atelier
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Flower Catalog Controls */}
                    <div className="lg:col-span-5 w-full flex flex-col gap-4 max-h-[640px] overflow-y-auto pr-1">
                        {FLORAL_CATALOG.map((flower) => (
                            <FlowerCard
                                key={flower.id}
                                flower={flower}
                                quantity={counts[flower.id] || 0}
                                onUpdateQuantity={handleUpdateQuantity}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}