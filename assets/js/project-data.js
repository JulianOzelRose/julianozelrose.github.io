// project-data.js

const projects = [
    {
        title: 'Tomb Raider Remastered Savegame Editor',
        href: '/projects/tomb-raider/',
        image: '/assets/images/tomb-raider-thumbnail.png',
        alt: 'Tomb Raider Remastered Savegame Editor',
        description:
            'A savegame editor for Tomb Raider I-VI Remastered, ' +
            'built by reverse engineering binary save formats ' +
            'across multiple games and platforms.',
        technologies: [
            'C#',
            'Binary Formats',
            'Reverse Engineering'
        ],
        featured: true,
        detail: {
            category: 'C# / Reverse Engineering',

            intro:
                'A savegame editor for Tomb Raider I-VI Remastered, ' +
                'built by reverse engineering binary save formats ' +
                'across multiple games and platforms.',

            imageAlt: '',

            imageCaption: 'Graphical interface of the savegame editor',

            actions: [
                {
                    label: 'Download',
                    href: 'https://github.com/JulianOzelRose/TRR-SaveMaster/releases',
                    primary: true
                },
                {
                    label: 'View on GitHub',
                    href: 'https://github.com/JulianOzelRose/TRR-SaveMaster',
                    primary: false
                }
            ],

            overview: [
                'TRR-SaveMaster is an open-source savegame editor for ' +
                'Tomb Raider I-VI Remastered, developed through reverse ' +
                'engineering of the games\' binary save formats and ' +
                'serialization logic.',

                'The editor supports all six remastered games and handles ' +
                'save formats from PC, PlayStation 4, Nintendo Switch, ' +
                'Android, and iOS. It accounts for differences in binary ' +
                'structure between individual games, platforms, and ' +
                'savegame versions.'
            ],

            features: [
                'Edit inventory, weapons, ammunition, and health',
                'Edit player position to teleport within a level',
                'Edit level and playthrough statistics',
                'Unlock New Game+, outfits, and other content',
                'Supports Tomb Raider I-VI Remastered',
                'Supports PC, PS4, Switch, Android, and iOS save formats'
            ],

            technicalHighlights: [
                'Reverse engineered the binary savegame formats used across ' +
                'Tomb Raider I-VI Remastered',

                'Reverse engineered and implemented Tomb Raider VI\'s proprietary ' +
                'LZW compression and decompression format',

                'Recreated game deserialization logic for Tomb Raider I-VI to ' +
                'locate dynamically-positioned savegame data',

                'Dumped and mapped game entity tables to build lookup tables for ' +
                'identifying serialized entities',

                'Accounted for structural differences across game versions, ' +
                'platforms, and savegame formats'
            ],

            technologies: [
                'C#',
                '.NET',
                'WinForms',
                'Binary Formats',
                'Reverse Engineering'
            ]
        }
    },
    {
        title: 'TP-Link Router Hacking',
        href: '/projects/tp-link-router/',
        image: '/assets/images/tp-link-router-thumbnail.jpg',
        alt: 'TP-Link TL-WR841N router hardware hacking',
        description:
            'Hardware and firmware exploration of a TP-Link ' +
            'WR841N router, including UART root access, ' +
            'TFTP filesystem extraction, and SPI flash dumping.',
        technologies: [
            'Embedded Linux',
            'Reverse Engineering',
            'Firmware Analysis'
        ],
        featured: true,
        detail: {
            category: 'Embedded Linux / Hardware Hacking',

            intro:
                'Hardware and firmware exploration of a TP-Link WR841N ' +
                'router, including UART root access, filesystem ' +
                'extraction, and SPI flash dumping.',

            imageAlt: '',

            imageCaption: 'Router exposed PCB with serial USB interface connected to UART',

            actions: [
                {
                    label: 'View on GitHub',
                    href: 'https://github.com/JulianOzelRose/TL-WR841N-v14',
                    primary: true
                }
            ],

            overview: [
                'This project explores the hardware and embedded Linux environment ' +
                'of a TP-Link WR841N router. Starting from the board\'s UART ' +
                'debugging interface, I gained root shell access and progressively ' +
                'explored the device\'s hardware, filesystem, and firmware.',

                'The project involved hardware modification, embedded Linux, ' +
                'filesystem extraction, SPI flash dumping, and cross-compiling ' +
                'software for the router\'s MIPS32 architecture.'
            ],

            technicalHighlights: [
                'Identified and tested the router\'s 3.3V UART interface and ' +
                'established serial communication at 115200 baud',

                'Obtained root shell access and bypassed hardware-enforced ' +
                'read-only console protection by modifying the UART RX circuit',

                'Extended the router\'s limited BusyBox environment and extracted ' +
                'its filesystem over TFTP',

                'Desoldered the SPI flash chip and dumped the router\'s firmware ' +
                'directly with a CH341A programmer',

                'Analyzed the extracted filesystem and raw firmware image',

                'Cross-compiled statically linked MIPS32 little-endian binaries ' +
                'and ran Snake and Tetris directly on the router'
            ],

            technologies: [
                'Embedded Linux',
                'MIPS32',
                'UART',
                'SPI',
                'TFTP',
                'Buildroot'
            ]
        }
    },
    {
        title: 'File Attribute Changer',
        href: '/projects/file-attribute-changer/',
        image: '/assets/images/file-attribute-changer-thumbnail.png',
        alt: 'File Attribute Changer',
        description:
            'Windows desktop utility for modifying file timestamps, ' +
            'attributes, encryption, and NTFS compression.',
        technologies: [
            'C#',
            '.NET',
            'Windows API'
        ],
        featured: true,
        detail: {
            category: 'C# / Windows Development',

            intro:
                'A Windows file management utility for modifying ' +
                'timestamps, file attributes, encryption, and NTFS ' +
                'compression.',

            imageAlt: '',

            imageCaption: 'Graphical interface of File Attribute Changer',

            actions: [
                {
                    label: 'Download',
                    href: 'https://github.com/JulianOzelRose/File-Attribute-Changer/releases',
                    primary: true
                },
                {
                    label: 'View on GitHub',
                    href: 'https://github.com/JulianOzelRose/File-Attribute-Changer',
                    primary: false
                }
            ],

            overview: [
                'File Attribute Changer is a Windows desktop utility ' +
                'for inspecting and modifying file properties through ' +
                'a graphical interface. It provides access to file ' +
                'timestamps, Windows file attributes, encryption, ' +
                'and NTFS compression.',

                'The project was built to explore Windows file ' +
                'management, the .NET Framework, native Windows APIs, ' +
                'and bitmask-based file attributes.'
            ],

            features: [
                'Modify file creation, access, and modification timestamps',
                'View and modify Windows file attributes',
                'Encrypt and decrypt files',
                'Compress and decompress files using NTFS compression',
                'Browse and select files through a graphical interface',
                'Supports elevation for files in protected system locations'
            ],

            technicalHighlights: [
                'Reads and modifies Windows file attributes using ' +
                'bitwise operations and attribute masks',

                'Interfaces with native Windows APIs for NTFS ' +
                'compression and filesystem operations',

                'Validates filesystem support before performing ' +
                'NTFS-specific operations',

                'Handles conflicts between mutually exclusive ' +
                'encrypted and compressed file states',

                'Integrates managed .NET file operations with ' +
                'native Windows functionality'
            ],

            technologies: [
                'C#',
                '.NET',
                'WinForms',
                'Windows API',
                'NTFS'
            ]
        }
    },
    {
        title: 'HardWar Savegame Editor',
        href: '/projects/hardwar/',
        image: '/assets/images/hardwar-thumbnail.png',
        alt: 'HardWar Savegame Editor',
        description:
            'Browser-based savegame and world editor for the ' +
            'cyberpunk PC game HardWar, built with plain ' +
            'JavaScript and HTML.',
        technologies: [
            'JavaScript',
            'HTML',
            'Reverse Engineering'
        ],
        featured: false,
        detail: {
            category: 'Reverse Engineering / Web Development',

            intro:
                'A browser-based savegame editor and world parser for the ' +
                'cyberpunk PC game HardWar, built with plain JavaScript ' +
                'and HTML.',

            imageAlt: '',

            imageCaption: 'Main graphical interface of the savegame editor',

            actions: [
                {
                    label: 'Open Live Editor',
                    href: 'https://julianozelrose.github.io/HardWar-SaveEdit/#',
                    primary: true
                },
                {
                    label: 'View on GitHub',
                    href: 'https://github.com/JulianOzelRose/HardWar-SaveEdit',
                    primary: false
                }
            ],

            overview: [
                'HardWar Savegame Editor is a browser-based editor and world-state ' +
                'parser for the 1998 cyberpunk PC game HardWar. Built through reverse ' +
                'engineering of the game\'s dynamic savegame structures, it reconstructs ' +
                'pilots, vehicles, hangars, factions, inventories, and the relationships ' +
                'between them.',

                'In addition to editing savegame values, the application acts as an ' +
                'inspector for the game\'s simulated world, allowing entities and their ' +
                'relationships to be explored directly from a save file.'
            ],

            features: [
                'Browse pilots, moths, hangars, and other world-state data',
                'Inspect relationships between pilots, vehicles, hangars, and factions',
                'View hangar inventory, stock quantities, and prices',
                'Edit pilot cash, moth health and shields, and hangar cash',
                'Generate modified savegame files directly in the browser',
                'Runs entirely client-side with no backend'
            ],

            technicalHighlights: [
                'Reverse-engineered dynamic binary structures for pilots, ' +
                'moths, hangars, factions, and other game-world data',

                'Reconstructed pointer-based relationships between serialized ' +
                'entities to resolve ownership, location, faction, and vehicle data',

                'Parsed variable world-state lists whose locations and entity ' +
                'counts are determined dynamically from the save file',

                'Reverse-engineered hangar inventory structures containing ' +
                'item quantities and pricing data',

                'Implemented binary parsing and modification entirely in ' +
                'client-side JavaScript'
            ],

            technologies: [
                'JavaScript',
                'HTML',
                'Binary Formats',
                'Reverse Engineering'
            ]
        }
    }
];