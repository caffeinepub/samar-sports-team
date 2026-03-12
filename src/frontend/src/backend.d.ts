import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Driver {
    id: Id;
    bio: string;
    name: string;
    wins: bigint;
    nationality: string;
    podiums: bigint;
    number: bigint;
    position: bigint;
}
export interface Sponsor {
    id: Id;
    name: string;
    tier: Variant_title_official_partner;
    website: string;
}
export type Id = bigint;
export interface Message {
    id: Id;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface Race {
    id: Id;
    status: Variant_upcoming_completed;
    date: string;
    name: string;
    location: string;
    circuit: string;
}
export interface Achievement {
    id: Id;
    title: string;
    year: bigint;
    description: string;
    category: Variant_championship_podium_record;
}
export enum Variant_championship_podium_record {
    championship = "championship",
    podium = "podium",
    record = "record"
}
export enum Variant_title_official_partner {
    title = "title",
    official = "official",
    partner = "partner"
}
export enum Variant_upcoming_completed {
    upcoming = "upcoming",
    completed = "completed"
}
export interface backendInterface {
    createAchievement(title: string, year: bigint, description: string, category: Variant_championship_podium_record): Promise<Achievement>;
    createDriver(name: string, number: bigint, nationality: string, position: bigint, bio: string, wins: bigint, podiums: bigint): Promise<Driver>;
    createRace(name: string, location: string, date: string, circuit: string): Promise<Race>;
    createSponsor(name: string, tier: Variant_title_official_partner, website: string): Promise<Sponsor>;
    deleteAchievement(id: Id): Promise<void>;
    deleteDriver(id: Id): Promise<void>;
    deleteMessage(id: Id): Promise<void>;
    deleteRace(id: Id): Promise<void>;
    deleteSponsor(id: Id): Promise<void>;
    getAchievement(id: Id): Promise<Achievement | null>;
    getAchievements(): Promise<Array<Achievement>>;
    getDriver(id: Id): Promise<Driver | null>;
    getDrivers(): Promise<Array<Driver>>;
    getMessage(id: Id): Promise<Message | null>;
    getMessages(): Promise<Array<Message>>;
    getRace(id: Id): Promise<Race | null>;
    getRaces(): Promise<Array<Race>>;
    getSponsor(id: Id): Promise<Sponsor | null>;
    getSponsors(): Promise<Array<Sponsor>>;
    initSeedData(): Promise<void>;
    reset(): Promise<void>;
    submitMessage(name: string, email: string, message: string): Promise<Message>;
    updateAchievement(id: Id, title: string, year: bigint, description: string, category: Variant_championship_podium_record): Promise<void>;
    updateDriver(id: Id, name: string, number: bigint, nationality: string, position: bigint, bio: string, wins: bigint, podiums: bigint): Promise<void>;
    updateRace(id: Id, name: string, location: string, date: string, circuit: string, status: Variant_upcoming_completed): Promise<void>;
    updateSponsor(id: Id, name: string, tier: Variant_title_official_partner, website: string): Promise<void>;
}
