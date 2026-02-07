/**
 * Bank Email Formats Seed Data
 * Based on industry research from 10xebitda.com, transacted.io, and direct verification
 *
 * Run with: npx tsx db/seeds/bank-email-formats.ts
 */

import { db } from '@/db';
import { bankEmailFormats } from '@/db/schema';
import { normalizeBankName } from '@/lib/outreach/email-format';

type EmailFormatType = 'first.last' | 'flast' | 'firstlast' | 'first_last' | 'lastf' | 'first';

interface BankData {
  bankName: string;
  emailFormat: EmailFormatType;
  domain: string;
  aliases?: string[];
  isVerified: boolean;
}

// Comprehensive bank email format data
// Sources: 10xebitda.com, transacted.io, direct verification
const banks: BankData[] = [
  // ═══════════════════════════════════════════════════════════════
  // BULGE BRACKET BANKS
  // ═══════════════════════════════════════════════════════════════
  {
    bankName: 'Goldman Sachs',
    emailFormat: 'first.last',
    domain: 'gs.com',
    aliases: ['GS', 'Goldman'],
    isVerified: true,
  },
  {
    bankName: 'Morgan Stanley',
    emailFormat: 'first.last',
    domain: 'morganstanley.com',
    aliases: ['MS'],
    isVerified: true,
  },
  {
    bankName: 'JPMorgan',
    emailFormat: 'first.last',
    domain: 'jpmorgan.com',
    aliases: ['JP Morgan', 'JPM', 'J.P. Morgan', 'Chase'],
    isVerified: true,
  },
  {
    bankName: 'Bank of America',
    emailFormat: 'first.last',
    domain: 'bofa.com',
    aliases: ['BofA', 'BoA', 'Merrill Lynch', 'BAML'],
    isVerified: true,
  },
  {
    bankName: 'Citigroup',
    emailFormat: 'first.last',
    domain: 'citi.com',
    aliases: ['Citi', 'Citibank'],
    isVerified: true,
  },
  {
    bankName: 'Barclays',
    emailFormat: 'first.last',
    domain: 'barclays.com',
    aliases: ['Barclays Capital'],
    isVerified: true,
  },
  {
    bankName: 'UBS',
    emailFormat: 'first.last',
    domain: 'ubs.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Deutsche Bank',
    emailFormat: 'first.last',
    domain: 'db.com',
    aliases: ['DB'],
    isVerified: true,
  },
  {
    bankName: 'Credit Suisse',
    emailFormat: 'first.last',
    domain: 'credit-suisse.com',
    aliases: ['CS'],
    isVerified: true,
  },
  {
    bankName: 'HSBC',
    emailFormat: 'first.last',
    domain: 'hsbc.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'BNP Paribas',
    emailFormat: 'first.last',
    domain: 'bnpparibas.com',
    aliases: ['BNP'],
    isVerified: true,
  },
  {
    bankName: 'Nomura',
    emailFormat: 'first.last',
    domain: 'nomura.com',
    aliases: ['Nomura Holdings'],
    isVerified: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // ELITE BOUTIQUES
  // ═══════════════════════════════════════════════════════════════
  {
    bankName: 'Centerview Partners',
    emailFormat: 'flast',
    domain: 'centerview.com',
    aliases: ['Centerview'],
    isVerified: true,
  },
  {
    bankName: 'Evercore',
    emailFormat: 'first.last',
    domain: 'evercore.com',
    aliases: ['Evercore ISI'],
    isVerified: true,
  },
  {
    bankName: 'Lazard',
    emailFormat: 'first.last',
    domain: 'lazard.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Moelis & Company',
    emailFormat: 'first.last',
    domain: 'moelis.com',
    aliases: ['Moelis'],
    isVerified: true,
  },
  {
    bankName: 'PJT Partners',
    emailFormat: 'first.last',
    domain: 'pjtpartners.com',
    aliases: ['PJT'],
    isVerified: true,
  },
  {
    bankName: 'Perella Weinberg Partners',
    emailFormat: 'flast',
    domain: 'pwpartners.com',
    aliases: ['PWP', 'Perella Weinberg'],
    isVerified: true,
  },
  {
    bankName: 'Qatalyst Partners',
    emailFormat: 'first.last',
    domain: 'qatalyst.com',
    aliases: ['Qatalyst'],
    isVerified: true,
  },
  {
    bankName: 'Guggenheim Securities',
    emailFormat: 'first.last',
    domain: 'guggenheimpartners.com',
    aliases: ['Guggenheim'],
    isVerified: true,
  },
  {
    bankName: 'Allen & Company',
    emailFormat: 'flast',
    domain: 'allenco.com',
    aliases: ['Allen & Co', 'Allen'],
    isVerified: true,
  },
  {
    bankName: 'Greenhill',
    emailFormat: 'first.last',
    domain: 'greenhill.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Ardea Partners',
    emailFormat: 'first',
    domain: 'ardeapartners.com',
    aliases: ['Ardea'],
    isVerified: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // MIDDLE MARKET BANKS
  // ═══════════════════════════════════════════════════════════════
  {
    bankName: 'Jefferies',
    emailFormat: 'flast',
    domain: 'jefferies.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'William Blair',
    emailFormat: 'flast',
    domain: 'williamblair.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Houlihan Lokey',
    emailFormat: 'flast',
    domain: 'hl.com',
    aliases: ['HL'],
    isVerified: true,
  },
  {
    bankName: 'Piper Sandler',
    emailFormat: 'first.last',
    domain: 'psc.com',
    aliases: ['Piper', 'Piper Jaffray'],
    isVerified: true,
  },
  {
    bankName: 'Stifel',
    emailFormat: 'lastf',
    domain: 'stifel.com',
    aliases: ['Stifel Nicolaus'],
    isVerified: true,
  },
  {
    bankName: 'Raymond James',
    emailFormat: 'first.last',
    domain: 'raymondjames.com',
    aliases: ['RJ'],
    isVerified: true,
  },
  {
    bankName: 'RBC Capital Markets',
    emailFormat: 'first.last',
    domain: 'rbccm.com',
    aliases: ['RBC', 'Royal Bank of Canada'],
    isVerified: true,
  },
  {
    bankName: 'BMO Capital Markets',
    emailFormat: 'first.last',
    domain: 'bmo.com',
    aliases: ['BMO', 'Bank of Montreal'],
    isVerified: true,
  },
  {
    bankName: 'TD Securities',
    emailFormat: 'first.last',
    domain: 'tdsecurities.com',
    aliases: ['TD', 'TD Bank'],
    isVerified: true,
  },
  {
    bankName: 'Wells Fargo Securities',
    emailFormat: 'first.last',
    domain: 'wellsfargo.com',
    aliases: ['Wells Fargo', 'Wells'],
    isVerified: true,
  },
  {
    bankName: 'Lincoln International',
    emailFormat: 'flast',
    domain: 'lincolninternational.com',
    aliases: ['Lincoln'],
    isVerified: true,
  },
  {
    bankName: 'Harris Williams',
    emailFormat: 'flast',
    domain: 'harriswilliams.com',
    aliases: ['HW'],
    isVerified: true,
  },
  {
    bankName: 'Baird',
    emailFormat: 'flast',
    domain: 'rwbaird.com',
    aliases: ['Robert W. Baird'],
    isVerified: true,
  },
  {
    bankName: 'Rothschild & Co',
    emailFormat: 'first.last',
    domain: 'rothschildandco.com',
    aliases: ['Rothschild'],
    isVerified: true,
  },
  {
    bankName: 'Macquarie',
    emailFormat: 'first.last',
    domain: 'macquarie.com',
    aliases: ['Macquarie Capital'],
    isVerified: true,
  },
  {
    bankName: 'Cowen',
    emailFormat: 'first.last',
    domain: 'cowen.com',
    aliases: ['Cowen & Company'],
    isVerified: true,
  },
  {
    bankName: 'Cantor Fitzgerald',
    emailFormat: 'first.last',
    domain: 'cantor.com',
    aliases: ['Cantor'],
    isVerified: true,
  },
  {
    bankName: 'Oppenheimer',
    emailFormat: 'first.last',
    domain: 'opco.com',
    aliases: ['Oppenheimer & Co'],
    isVerified: true,
  },
  {
    bankName: 'KeyBanc Capital Markets',
    emailFormat: 'flast',
    domain: 'key.com',
    aliases: ['KeyBanc', 'Key Bank'],
    isVerified: true,
  },
  {
    bankName: 'Truist Securities',
    emailFormat: 'first.last',
    domain: 'truist.com',
    aliases: ['Truist', 'SunTrust Robinson Humphrey'],
    isVerified: true,
  },
  {
    bankName: 'Citizens Capital Markets',
    emailFormat: 'first.last',
    domain: 'citizensbank.com',
    aliases: ['Citizens'],
    isVerified: true,
  },
  {
    bankName: 'Canaccord Genuity',
    emailFormat: 'flast',
    domain: 'cgf.com',
    aliases: ['Canaccord'],
    isVerified: true,
  },
  {
    bankName: 'BNY Mellon',
    emailFormat: 'first.last',
    domain: 'bnymellon.com',
    aliases: ['Bank of New York Mellon'],
    isVerified: true,
  },
  {
    bankName: 'ABN AMRO',
    emailFormat: 'first.last',
    domain: 'abnamro.com',
    aliases: [],
    isVerified: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // SPECIALTY & SECTOR-FOCUSED BOUTIQUES
  // ═══════════════════════════════════════════════════════════════
  {
    bankName: 'Intrepid Investment Bankers',
    emailFormat: 'flast',
    domain: 'intrepidib.com',
    aliases: ['Intrepid', 'Intrepid IB'],
    isVerified: true,
  },
  {
    bankName: 'FT Partners',
    emailFormat: 'first.last',
    domain: 'ftpartners.com',
    aliases: ['Financial Technology Partners'],
    isVerified: true,
  },
  {
    bankName: 'Solomon Partners',
    emailFormat: 'first.last',
    domain: 'solomonpartners.com',
    aliases: ['Solomon', 'Peter J. Solomon'],
    isVerified: true,
  },
  {
    bankName: 'Union Square Advisors',
    emailFormat: 'first.last',
    domain: 'usadvisors.com',
    aliases: ['USA', 'Union Square'],
    isVerified: true,
  },
  {
    bankName: 'TAP Advisors',
    emailFormat: 'flast',
    domain: 'tapadvisors.com',
    aliases: ['TAP'],
    isVerified: true,
  },
  {
    bankName: 'SVB Leerink',
    emailFormat: 'first.last',
    domain: 'svbleerink.com',
    aliases: ['Leerink', 'SVB Securities'],
    isVerified: true,
  },
  {
    bankName: 'Duff & Phelps',
    emailFormat: 'first.last',
    domain: 'duffandphelps.com',
    aliases: ['Kroll'],
    isVerified: true,
  },
  {
    bankName: 'TripleTree',
    emailFormat: 'flast',
    domain: 'triple-tree.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Imperial Capital',
    emailFormat: 'first.last',
    domain: 'imperialcapital.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Cain Brothers',
    emailFormat: 'flast',
    domain: 'cainbrothers.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Leerink Partners',
    emailFormat: 'first.last',
    domain: 'leerink.com',
    aliases: ['Leerink'],
    isVerified: true,
  },
  {
    bankName: 'Berkery Noyes',
    emailFormat: 'first.last',
    domain: 'berkerynoyes.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'DC Advisory',
    emailFormat: 'first.last',
    domain: 'dcadvisory.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Focus Investment Banking',
    emailFormat: 'first.last',
    domain: 'focusbankers.com',
    aliases: ['Focus'],
    isVerified: true,
  },
  {
    bankName: 'Capstone Partners',
    emailFormat: 'first.last',
    domain: 'capstonepartners.com',
    aliases: ['Capstone'],
    isVerified: true,
  },
  {
    bankName: 'GCA Advisors',
    emailFormat: 'first.last',
    domain: 'gcaglobal.com',
    aliases: ['GCA'],
    isVerified: true,
  },
  {
    bankName: 'Drake Star Partners',
    emailFormat: 'first.last',
    domain: 'drakestar.com',
    aliases: ['Drake Star'],
    isVerified: true,
  },
  {
    bankName: 'Mooreland Partners',
    emailFormat: 'first.last',
    domain: 'mooreland.com',
    aliases: ['Mooreland'],
    isVerified: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // REGIONAL BOUTIQUES
  // ═══════════════════════════════════════════════════════════════
  {
    bankName: 'Black Arch Partners',
    emailFormat: 'flast',
    domain: 'blackarchpartners.com',
    aliases: ['Black Arch'],
    isVerified: true,
  },
  {
    bankName: 'Covington Associates',
    emailFormat: 'flast',
    domain: 'covllc.com',
    aliases: ['Covington'],
    isVerified: true,
  },
  {
    bankName: 'Edgemont Partners',
    emailFormat: 'flast',
    domain: 'edgemont.com',
    aliases: ['Edgemont'],
    isVerified: true,
  },
  {
    bankName: 'Clearsight Advisors',
    emailFormat: 'flast',
    domain: 'clearsightadvisors.com',
    aliases: ['Clearsight'],
    isVerified: true,
  },
  {
    bankName: 'Fortitude Advisors',
    emailFormat: 'flast',
    domain: 'fortitudeadvisors.com',
    aliases: ['Fortitude'],
    isVerified: true,
  },
  {
    bankName: 'Northborne Partners',
    emailFormat: 'flast',
    domain: 'northborne.com',
    aliases: ['Northborne'],
    isVerified: true,
  },
  {
    bankName: 'Fairmount Partners',
    emailFormat: 'first.last',
    domain: 'fairmountpartners.com',
    aliases: ['Fairmount'],
    isVerified: true,
  },
  {
    bankName: 'P&M Corporate Finance',
    emailFormat: 'first.last',
    domain: 'pmcf.com',
    aliases: ['PMCF'],
    isVerified: true,
  },
  {
    bankName: 'Livingstone Partners',
    emailFormat: 'first.last',
    domain: 'livingstonepartners.com',
    aliases: ['Livingstone'],
    isVerified: true,
  },
  {
    bankName: 'Cascadia Capital',
    emailFormat: 'first.last',
    domain: 'cascadiacapital.com',
    aliases: ['Cascadia'],
    isVerified: true,
  },
  {
    bankName: 'Prairie Capital Advisors',
    emailFormat: 'first.last',
    domain: 'prairiecap.com',
    aliases: ['Prairie Capital'],
    isVerified: true,
  },
  {
    bankName: 'Brown Gibbons Lang',
    emailFormat: 'first.last',
    domain: 'bfrg.com',
    aliases: ['BGL'],
    isVerified: true,
  },
  {
    bankName: 'Childs Advisory Partners',
    emailFormat: 'first.last',
    domain: 'childsadvisory.com',
    aliases: ['Childs Advisory'],
    isVerified: true,
  },
  {
    bankName: 'The Sage Group',
    emailFormat: 'first.last',
    domain: 'thesagegroup.com',
    aliases: ['Sage Group'],
    isVerified: true,
  },
  {
    bankName: 'Citizens M&A',
    emailFormat: 'first.last',
    domain: 'citizensma.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Headwaters MB',
    emailFormat: 'first.last',
    domain: 'headwatersmb.com',
    aliases: ['Headwaters'],
    isVerified: true,
  },
  {
    bankName: 'Stout',
    emailFormat: 'first.last',
    domain: 'stout.com',
    aliases: ['Stout Risius Ross'],
    isVerified: true,
  },
  {
    bankName: 'Progress Partners',
    emailFormat: 'first.last',
    domain: 'progresspartners.com',
    aliases: ['Progress'],
    isVerified: true,
  },
  {
    bankName: 'D.A. Davidson',
    emailFormat: 'first.last',
    domain: 'dadavidson.com',
    aliases: ['DA Davidson'],
    isVerified: true,
  },
  {
    bankName: 'Hempstead & Co',
    emailFormat: 'first.last',
    domain: 'hempstead.com',
    aliases: ['Hempstead'],
    isVerified: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE EQUITY FIRMS
  // ═══════════════════════════════════════════════════════════════
  {
    bankName: 'Blackstone',
    emailFormat: 'first.last',
    domain: 'blackstone.com',
    aliases: ['BX'],
    isVerified: true,
  },
  {
    bankName: 'KKR',
    emailFormat: 'first.last',
    domain: 'kkr.com',
    aliases: ['Kohlberg Kravis Roberts'],
    isVerified: true,
  },
  {
    bankName: 'Apollo Global Management',
    emailFormat: 'first.last',
    domain: 'apollo.com',
    aliases: ['Apollo'],
    isVerified: true,
  },
  {
    bankName: 'Carlyle Group',
    emailFormat: 'first.last',
    domain: 'carlyle.com',
    aliases: ['Carlyle', 'The Carlyle Group'],
    isVerified: true,
  },
  {
    bankName: 'TPG',
    emailFormat: 'first.last',
    domain: 'tpg.com',
    aliases: ['Texas Pacific Group'],
    isVerified: true,
  },
  {
    bankName: 'Warburg Pincus',
    emailFormat: 'first.last',
    domain: 'warburgpincus.com',
    aliases: ['Warburg'],
    isVerified: true,
  },
  {
    bankName: 'Bain Capital',
    emailFormat: 'first.last',
    domain: 'baincapital.com',
    aliases: ['Bain'],
    isVerified: true,
  },
  {
    bankName: 'Advent International',
    emailFormat: 'first.last',
    domain: 'adventinternational.com',
    aliases: ['Advent'],
    isVerified: true,
  },
  {
    bankName: 'Silver Lake',
    emailFormat: 'first.last',
    domain: 'silverlake.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Vista Equity Partners',
    emailFormat: 'first.last',
    domain: 'vistaequitypartners.com',
    aliases: ['Vista Equity', 'Vista'],
    isVerified: true,
  },
  {
    bankName: 'Thoma Bravo',
    emailFormat: 'first.last',
    domain: 'thomabravo.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'General Atlantic',
    emailFormat: 'first.last',
    domain: 'generalatlantic.com',
    aliases: ['GA'],
    isVerified: true,
  },
  {
    bankName: 'Hellman & Friedman',
    emailFormat: 'first.last',
    domain: 'hfrp.com',
    aliases: ['H&F'],
    isVerified: true,
  },
  {
    bankName: 'Providence Equity Partners',
    emailFormat: 'first.last',
    domain: 'provequity.com',
    aliases: ['Providence', 'Providence Equity'],
    isVerified: true,
  },
  {
    bankName: 'Leonard Green & Partners',
    emailFormat: 'first.last',
    domain: 'leonardgreen.com',
    aliases: ['Leonard Green', 'LGP'],
    isVerified: true,
  },
  {
    bankName: 'Clayton Dubilier & Rice',
    emailFormat: 'first.last',
    domain: 'cdr-inc.com',
    aliases: ['CD&R', 'CDR'],
    isVerified: true,
  },
  {
    bankName: 'CVC Capital Partners',
    emailFormat: 'first.last',
    domain: 'cvc.com',
    aliases: ['CVC'],
    isVerified: true,
  },
  {
    bankName: 'Apax Partners',
    emailFormat: 'first.last',
    domain: 'apax.com',
    aliases: ['Apax'],
    isVerified: true,
  },
  {
    bankName: 'American Securities',
    emailFormat: 'first.last',
    domain: 'american-securities.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'GTCR',
    emailFormat: 'first.last',
    domain: 'gtcr.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Summit Partners',
    emailFormat: 'first.last',
    domain: 'summitpartners.com',
    aliases: ['Summit'],
    isVerified: true,
  },
  {
    bankName: 'TA Associates',
    emailFormat: 'first.last',
    domain: 'ta.com',
    aliases: ['TA'],
    isVerified: true,
  },
  {
    bankName: 'Francisco Partners',
    emailFormat: 'first.last',
    domain: 'franciscopartners.com',
    aliases: ['Francisco'],
    isVerified: true,
  },
  {
    bankName: 'Insight Partners',
    emailFormat: 'first.last',
    domain: 'insightpartners.com',
    aliases: ['Insight'],
    isVerified: true,
  },
  {
    bankName: 'Clearlake Capital',
    emailFormat: 'first.last',
    domain: 'clearlake.com',
    aliases: ['Clearlake'],
    isVerified: true,
  },
  {
    bankName: 'Platinum Equity',
    emailFormat: 'first.last',
    domain: 'platinumequity.com',
    aliases: ['Platinum'],
    isVerified: true,
  },
  {
    bankName: 'Genstar Capital',
    emailFormat: 'first.last',
    domain: 'genstarcapital.com',
    aliases: ['Genstar'],
    isVerified: true,
  },
  {
    bankName: 'Audax Group',
    emailFormat: 'first.last',
    domain: 'audaxgroup.com',
    aliases: ['Audax'],
    isVerified: true,
  },
  {
    bankName: 'New Mountain Capital',
    emailFormat: 'first.last',
    domain: 'newmountaincapital.com',
    aliases: ['New Mountain'],
    isVerified: true,
  },
  {
    bankName: 'Welsh Carson',
    emailFormat: 'first.last',
    domain: 'welshcarson.com',
    aliases: ['WCAS', 'Welsh Carson Anderson & Stowe'],
    isVerified: true,
  },
  {
    bankName: 'Veritas Capital',
    emailFormat: 'first.last',
    domain: 'veritascapital.com',
    aliases: ['Veritas'],
    isVerified: true,
  },
  {
    bankName: 'Golden Gate Capital',
    emailFormat: 'first.last',
    domain: 'goldengatecap.com',
    aliases: ['Golden Gate'],
    isVerified: true,
  },
  {
    bankName: 'Cerberus Capital',
    emailFormat: 'first.last',
    domain: 'cerberuscapital.com',
    aliases: ['Cerberus'],
    isVerified: true,
  },
  {
    bankName: 'Roark Capital',
    emailFormat: 'first.last',
    domain: 'roarkcapital.com',
    aliases: ['Roark'],
    isVerified: true,
  },
  {
    bankName: 'H.I.G. Capital',
    emailFormat: 'first.last',
    domain: 'higcapital.com',
    aliases: ['HIG', 'H.I.G.'],
    isVerified: true,
  },
  {
    bankName: 'Ares Management',
    emailFormat: 'first.last',
    domain: 'aresmgmt.com',
    aliases: ['Ares'],
    isVerified: true,
  },
  {
    bankName: 'L Catterton',
    emailFormat: 'first.last',
    domain: 'lcatterton.com',
    aliases: ['Catterton'],
    isVerified: true,
  },
  {
    bankName: 'Trilantic',
    emailFormat: 'first.last',
    domain: 'trilantic.com',
    aliases: ['Trilantic Capital'],
    isVerified: true,
  },
  {
    bankName: 'Stone Point Capital',
    emailFormat: 'first.last',
    domain: 'stonepoint.com',
    aliases: ['Stone Point'],
    isVerified: true,
  },
  {
    bankName: 'Kelso & Company',
    emailFormat: 'first.last',
    domain: 'kelso.com',
    aliases: ['Kelso'],
    isVerified: true,
  },
  {
    bankName: 'Oak Hill Capital',
    emailFormat: 'first.last',
    domain: 'oakhillcapital.com',
    aliases: ['Oak Hill'],
    isVerified: true,
  },
  {
    bankName: 'Alpine Investors',
    emailFormat: 'first.last',
    domain: 'alpineinvestors.com',
    aliases: ['Alpine'],
    isVerified: true,
  },
  {
    bankName: 'AEA Investors',
    emailFormat: 'first.last',
    domain: 'aeainvestors.com',
    aliases: ['AEA'],
    isVerified: true,
  },
  {
    bankName: 'The Riverside Company',
    emailFormat: 'first.last',
    domain: 'riversidecompany.com',
    aliases: ['Riverside'],
    isVerified: true,
  },
  {
    bankName: 'Sun Capital Partners',
    emailFormat: 'first.last',
    domain: 'suncappart.com',
    aliases: ['Sun Capital'],
    isVerified: true,
  },
  {
    bankName: 'Gridiron Capital',
    emailFormat: 'first.last',
    domain: 'gridironcapital.com',
    aliases: ['Gridiron'],
    isVerified: true,
  },
  {
    bankName: 'Kohlberg & Company',
    emailFormat: 'first.last',
    domain: 'kohlberg.com',
    aliases: ['Kohlberg'],
    isVerified: true,
  },
  {
    bankName: 'Permira',
    emailFormat: 'first.last',
    domain: 'permira.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Cinven',
    emailFormat: 'first.last',
    domain: 'cinven.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'EQT Partners',
    emailFormat: 'first.last',
    domain: 'eqtpartners.com',
    aliases: ['EQT'],
    isVerified: true,
  },
  {
    bankName: 'PAI Partners',
    emailFormat: 'first.last',
    domain: 'paipartners.com',
    aliases: ['PAI'],
    isVerified: true,
  },
  {
    bankName: 'Bridgepoint',
    emailFormat: 'first.last',
    domain: 'bridgepoint.eu',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'BC Partners',
    emailFormat: 'first.last',
    domain: 'bcpartners.com',
    aliases: ['BC'],
    isVerified: true,
  },
  {
    bankName: 'Eurazeo',
    emailFormat: 'first.last',
    domain: 'eurazeo.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Investcorp',
    emailFormat: 'first.last',
    domain: 'investcorp.com',
    aliases: [],
    isVerified: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // GROWTH EQUITY / VENTURE
  // ═══════════════════════════════════════════════════════════════
  {
    bankName: 'Accel',
    emailFormat: 'first.last',
    domain: 'accel.com',
    aliases: ['Accel Partners'],
    isVerified: true,
  },
  {
    bankName: 'Andreessen Horowitz',
    emailFormat: 'first.last',
    domain: 'a16z.com',
    aliases: ['a16z'],
    isVerified: true,
  },
  {
    bankName: 'Sequoia Capital',
    emailFormat: 'first.last',
    domain: 'sequoiacap.com',
    aliases: ['Sequoia'],
    isVerified: true,
  },
  {
    bankName: 'Bessemer Venture Partners',
    emailFormat: 'first.last',
    domain: 'bvp.com',
    aliases: ['Bessemer', 'BVP'],
    isVerified: true,
  },
  {
    bankName: 'Lightspeed Venture Partners',
    emailFormat: 'first.last',
    domain: 'lsvp.com',
    aliases: ['Lightspeed'],
    isVerified: true,
  },
  {
    bankName: 'Index Ventures',
    emailFormat: 'first.last',
    domain: 'indexventures.com',
    aliases: ['Index'],
    isVerified: true,
  },
  {
    bankName: 'Battery Ventures',
    emailFormat: 'first.last',
    domain: 'battery.com',
    aliases: ['Battery'],
    isVerified: true,
  },
  {
    bankName: 'General Catalyst',
    emailFormat: 'first.last',
    domain: 'generalcatalyst.com',
    aliases: ['GC'],
    isVerified: true,
  },
  {
    bankName: 'Greylock Partners',
    emailFormat: 'first.last',
    domain: 'greylock.com',
    aliases: ['Greylock'],
    isVerified: true,
  },
  {
    bankName: 'NEA',
    emailFormat: 'first.last',
    domain: 'nea.com',
    aliases: ['New Enterprise Associates'],
    isVerified: true,
  },
  {
    bankName: 'Founders Fund',
    emailFormat: 'first.last',
    domain: 'foundersfund.com',
    aliases: [],
    isVerified: true,
  },
  {
    bankName: 'Benchmark',
    emailFormat: 'first.last',
    domain: 'benchmark.com',
    aliases: ['Benchmark Capital'],
    isVerified: true,
  },
];

async function seedBankEmailFormats() {
  console.log('Seeding bank email formats...');
  console.log(`Total banks to seed: ${banks.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const bank of banks) {
    const bankNameNormalized = normalizeBankName(bank.bankName);

    try {
      await db
        .insert(bankEmailFormats)
        .values({
          bankName: bank.bankName,
          bankNameNormalized,
          emailFormat: bank.emailFormat,
          domain: bank.domain,
          aliases: bank.aliases || [],
          isVerified: bank.isVerified,
        })
        .onConflictDoUpdate({
          target: bankEmailFormats.bankNameNormalized,
          set: {
            bankName: bank.bankName,
            emailFormat: bank.emailFormat,
            domain: bank.domain,
            aliases: bank.aliases || [],
            isVerified: bank.isVerified,
            updatedAt: new Date(),
          },
        });

      console.log(`  ✓ ${bank.bankName} (${bank.emailFormat}@${bank.domain})`);
      successCount++;
    } catch (error) {
      console.error(`  ✗ ${bank.bankName}:`, error);
      errorCount++;
    }
  }

  console.log(`\n═══════════════════════════════════════════════════════════════`);
  console.log(`Seeding complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Errors: ${errorCount}`);
  console.log(`  Total: ${banks.length}`);
  console.log(`═══════════════════════════════════════════════════════════════\n`);
}

// Run if executed directly
seedBankEmailFormats()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to seed:', error);
    process.exit(1);
  });
