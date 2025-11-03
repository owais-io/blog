# LFCS Phase 1 - Complete Post Breakdown

## Series Information
- **Series Name**: LFCS Certification Preparation - Phase 1
- **Total Phases**: 9
- **Current Phase**: 1
- **Expected Posts**: 35-40 posts
- **Target Audience**: Absolute beginners progressing to advanced
- **Format**: Detailed explanations + Command outputs + Diagrams + 15-20 practice labs per post

---

## Post Structure (Order follows lfcs-rough.txt exactly)

### Section 1: Linux Fundamentals (Posts 1-3)
1. **Understanding Linux Operating Systems and Distributions**
   - What is Linux and how it differs from Windows/macOS
   - Linux distributions explained
   - RedHat family (RHEL, CentOS, Fedora, Rocky Linux)
   - Debian family (Ubuntu, Debian, Mint)
   - Other families (Arch, SUSE, etc.)
   - Installing RedHat family Linux
   - Installing Ubuntu LTS
   - Windows Subsystem for Linux (WSL) setup

2. **Understanding Users, Groups, and Privilege Escalation Part 1: Groups**
   - The wheel group (RedHat/CentOS)
   - The sudo group (Debian/Ubuntu)
   - How group membership grants privileges
   - Differences between wheel and sudo groups

3. **Understanding the Root User and su Command**
   - What is the root user
   - Root vs Administrator in Windows
   - Root user's relationship with the kernel
   - The su command explained
   - su vs su - (login shell vs non-login shell)
   - /etc/profile and environment loading
   - When to use su

### Section 2: Privilege Escalation & sudo (Posts 4-5)
4. **Mastering sudo: Temporary Privilege Escalation**
   - What is sudo and why it's safer than su
   - sudo vs su comparison
   - Basic sudo usage
   - sudo -i for interactive root shell
   - Default admin users on Ubuntu and RedHat
   - sudo timeout and password caching

5. **Creating and Managing sudo Configuration**
   - Understanding /etc/sudoers
   - Using visudo safely
   - Basic sudoers syntax
   - Granting specific commands to users
   - Restricting dangerous commands (passwd root)
   - sudoers best practices
   - Practice: Creating custom sudo policies

### Section 3: Basic Linux Commands (Posts 6-9)
6. **Linux Command Basics: Case Sensitivity and Command Options**
   - Linux is case sensitive (LS vs ls)
   - Understanding command structure
   - Short options (-a, -l) vs long options (--all, --list)
   - Combining options (-la vs -l -a)
   - Why single dash vs double dash matters
   - Common beginner mistakes

7. **Essential Navigation Commands: ls, pwd, cd, whoami**
   - whoami - identifying current user
   - pwd - print working directory
   - cd - change directory
   - cd ~ (home directory)
   - cd - (previous directory)
   - cd .. (parent directory)
   - ls - list directory contents
   - ls -a (show hidden files)
   - ls -l (long format)
   - ls -al (combined)
   - Understanding ls -l output breakdown

8. **Understanding File Timestamps with touch**
   - What is touch command
   - Creating empty files
   - Updating file timestamps (access time, modification time)
   - Understanding timestamps in ls -l
   - Why timestamps matter for system administration
   - Practical use cases

9. **Understanding the passwd Command**
   - Changing user passwords
   - Password complexity requirements
   - BAD PASSWORD warnings
   - passwd options (--help)
   - When regular users need sudo for passwd
   - Password security best practices

### Section 4: Getting Help (Posts 10-14)
10. **Introduction to Linux Help Systems**
    - Why learning to find help is critical
    - Overview of help resources: man, info, --help, tldr, /usr/share/doc
    - When to use which help system

11. **Mastering man Pages Part 1: Basics**
    - What are man pages
    - man command syntax
    - Reading man page structure (NAME, SYNOPSIS, DESCRIPTION, OPTIONS)
    - Navigating man pages (Space, b, q)
    - Searching within man pages using /
    - Understanding man page sections (1-9)

12. **Mastering man Pages Part 2: Sections and Advanced Usage**
    - Section 1: User commands
    - Section 5: File formats (/etc/passwd, /etc/fstab)
    - Section 8: System administration commands
    - man 5 passwd vs man 1 passwd
    - man -k (apropos) for searching
    - mandb - updating man page database
    - Filtering man -k output with grep

13. **Using info, pinfo, and --help**
    - info command for detailed documentation
    - info '(coreutils) ls invocation'
    - pinfo as a better text-based browser
    - When info is better than man
    - Using --help for quick reference
    - Comparing man, info, and --help output

14. **Exploring /usr/share/doc and tldr**
    - Purpose of /usr/share/doc
    - Finding package documentation
    - README files, examples, changelogs
    - Installing and using tldr
    - tldr vs man: quick examples vs detailed docs
    - Creating your own documentation library

### Section 5: Network Basics (Posts 15-16)
15. **Understanding Network Interfaces with ip Command**
    - The ip a command
    - Understanding lo (loopback interface)
    - Understanding physical interfaces (enp0s3, eth0)
    - Reading IP address output (inet, inet6)
    - MAC addresses explained
    - Interface states (UP, DOWN)

16. **Managing Hostnames and /etc/hosts**
    - The hostname command
    - hostname -i (IP address)
    - hostname -f (FQDN)
    - Changing hostname with hostname command (temporary)
    - Using hostnamectl (permanent)
    - Static vs transient hostnames
    - Understanding /etc/hosts file
    - localhost and 127.0.0.1

### Section 6: Linux Filesystem Hierarchy (Posts 17-20)
17. **Understanding Linux Filesystem Hierarchy Part 1: Overview**
    - "Everything is a file" philosophy
    - The root directory /
    - Major directories: /bin, /boot, /dev, /etc, /home, /lib, /media, /mnt, /opt, /proc, /root, /run, /sbin, /srv, /sys, /tmp, /usr, /var
    - FHS (Filesystem Hierarchy Standard)
    - Diagram: Linux filesystem tree

18. **Understanding Linux Filesystem Hierarchy Part 2: /usr**
    - Purpose of /usr (Unix System Resources)
    - /usr/bin (user binaries)
    - /usr/sbin (system binaries)
    - /usr/lib (libraries)
    - /usr/share (shared data)
    - /usr/local (locally installed software)
    - Why /usr is mostly read-only

19. **Understanding Linux Filesystem Hierarchy Part 3: /var and /etc**
    - /var (variable data)
    - /var/log (log files)
    - /var/cache (cache data)
    - /var/tmp (temporary files)
    - /etc (system configuration)
    - Why /etc is critical
    - /etc/passwd, /etc/shadow, /etc/hosts examples

20. **Understanding Write Permissions and Access**
    - Where regular users can write
    - /tmp for temporary files
    - /home/username for user data
    - Using touch to test write access
    - Permission denied errors
    - Why you can't write to /root or /var/log

### Section 7: File Operations (Posts 21-27)
21. **Using Wildcards for Efficient File Management**
    - What are wildcards
    - * (zero or more characters)
    - ? (single character)
    - [...] (character ranges)
    - Examples: *.txt, file?.log, [abc]*
    - Combining wildcards
    - Common use cases
    - Practice: 20 wildcard scenarios

22. **Copying Files with cp Command**
    - Basic cp syntax
    - cp file1 file2
    - cp file1 /destination/
    - cp -r (recursive for directories)
    - cp -i (interactive/prompt before overwrite)
    - cp -v (verbose)
    - cp -p (preserve attributes)
    - Copying multiple files
    - Copying hidden files (challenge)
    - tar as alternative for hidden files

23. **Creating and Managing Directories with mkdir**
    - mkdir syntax
    - mkdir directory_name
    - mkdir -p (create parent directories)
    - mkdir -v (verbose)
    - Creating multiple directories at once
    - Permission requirements
    - Common errors and solutions

24. **Understanding Absolute vs Relative Paths**
    - What is a path
    - Absolute paths (starting with /)
    - Relative paths (from current location)
    - . (current directory)
    - .. (parent directory)
    - ~ (home directory)
    - Diagram: Path navigation visualization
    - Examples with cd and file operations
    - Best practices: when to use which

25. **Moving and Renaming Files with mv**
    - mv syntax
    - Moving files: mv file1 /destination/
    - Renaming files: mv oldname newname
    - Moving directories
    - mv -i (interactive)
    - mv -v (verbose)
    - Common mistakes and how to avoid them

26. **Removing Files and Directories with rm**
    - rm syntax and danger warnings
    - rm file
    - rm -r (recursive for directories)
    - rm -f (force)
    - rm -i (interactive - safer)
    - rmdir for empty directories
    - The dangerous rm -rf command
    - The catastrophic rm -rf / --no-preserve-root (DON'T RUN THIS!)
    - Safe deletion practices

27. **File Operations Practice Lab**
    - 20 comprehensive practice tasks
    - Creating directory structures
    - Copying with wildcards
    - Moving and renaming in bulk
    - Safe deletion practices
    - Real-world scenarios

### Section 8: Links (Posts 28-29)
28. **Understanding Inodes and Hard Links**
    - What is a link
    - What is an inode
    - Hard links explained
    - ls -i to see inode numbers
    - Creating hard links with ln
    - Hard link characteristics
    - When hard links share inode numbers
    - Limitations of hard links
    - Diagram: Inode structure

29. **Understanding Symbolic Links (Symlinks)**
    - Symbolic links explained
    - Differences between hard and symbolic links
    - Creating symbolic links with ln -s
    - Broken symbolic links
    - Following symlinks
    - ls -l display of symlinks
    - Use cases for each link type
    - Practice: Creating and managing both link types

### Section 9: Text Editors (Posts 30-31)
30. **Mastering vim Text Editor Part 1: Basics**
    - Why vim matters for system administrators
    - Installing vim on different distributions
    - Three modes: Command, Insert, Visual
    - Starting vim
    - Entering insert mode (i, I, a, A, o, O)
    - Exiting insert mode (ESC)
    - Saving and quitting (:w, :q, :wq, :q!)
    - Basic navigation (h, j, k, l)
    - vimtutor for practice

31. **Mastering vim Text Editor Part 2: Advanced Commands**
    - Deleting: x, dd, 3dd, dw
    - Undo and redo: u, Ctrl-r
    - Copy and paste: yy, p, P
    - Visual mode: v, V
    - Jumping: gg (start), G (end), w, b, ^, $
    - Searching: /text, n, N
    - Replace: :s/old/new/, :%s/old/new/g
    - Line numbers: :set number
    - Replacing character: r
    - Complete vim commands reference
    - 20 vim practice exercises

### Section 10: Text Viewing Tools (Posts 32-34)
32. **Browsing Text Files with more and less**
    - more command basics
    - less command basics
    - Navigation in more/less (Space, b, q)
    - Searching in less (/pattern)
    - Why less is better than more
    - less -N for line numbers
    - Practical use cases

33. **Using head and tail for File Inspection**
    - head command (first 10 lines)
    - head -n to specify line count
    - tail command (last 10 lines)
    - tail -n for custom count
    - tail -f for following log files in real-time
    - Practical examples with system logs
    - Combining head/tail with pipes

34. **Displaying File Contents with cat and tac**
    - cat for displaying files
    - cat -n for line numbers
    - cat -s for squeezing blank lines
    - Concatenating multiple files
    - tac for reverse display
    - When to use cat vs less
    - Creating files with cat and here-documents

### Section 11: Text Processing (Posts 35-41)
35. **Mastering grep for Pattern Matching**
    - grep basics
    - grep pattern file
    - grep -i (case insensitive)
    - grep -v (invert match)
    - grep -l (list files with matches)
    - grep -A5 (show 5 lines after match)
    - grep -B5 (show 5 lines before match)
    - grep -C5 (show 5 lines context)
    - grep -R (recursive search)
    - Combining grep options
    - Real-world examples

36. **Using cut and sort for Data Manipulation**
    - cut command basics
    - cut -d (delimiter)
    - cut -f (fields)
    - Extracting columns from /etc/passwd
    - sort command basics
    - sort -n (numeric sort)
    - sort -r (reverse)
    - sort -k (sort by field)
    - Combining cut and sort
    - Processing CSV data

37. **Introduction to Regular Expressions Part 1: Basics**
    - What are regular expressions
    - Why use single quotes
    - Basic patterns: ^, $, .
    - Character classes: [abc], [a-z], [0-9]
    - Quantifiers: *, +, ?
    - man 7 regex for details
    - grep with regex
    - Practical examples

38. **Introduction to Regular Expressions Part 2: Advanced**
    - grep -E for extended regex
    - Alternation: (pattern1|pattern2)
    - Grouping with ()
    - Escaping special characters
    - Word boundaries
    - Complex pattern examples
    - Real-world log parsing

39. **Text Transformation with tr**
    - tr basics (translate/delete characters)
    - tr 'a-z' 'A-Z' (case conversion)
    - tr -d (delete characters)
    - tr -s (squeeze repeats)
    - Practical examples

40. **Introduction to awk for Text Processing**
    - What is awk
    - awk syntax basics
    - Fields: $1, $2, $NF
    - Built-in variables: NR, NF
    - awk patterns and actions
    - awk with /etc/passwd
    - Calculating summaries
    - Practical system administration examples

41. **Getting Started with sed Stream Editor**
    - What is sed
    - sed 's/old/new/' (substitute)
    - sed 's/old/new/g' (global)
    - sed -i (in-place editing)
    - sed -e for multiple commands
    - Deleting lines with sed
    - sed with regular expressions
    - Practical log file manipulation

### Section 12: SSH and Remote Access (Posts 42-44)
42. **Understanding SSH and Remote Server Access**
    - What is SSH
    - SSH vs Telnet (security)
    - sshd (server) vs ssh (client)
    - Installing SSH on CentOS/RHEL
    - Installing SSH on Ubuntu/Debian
    - Starting and enabling sshd service
    - Basic ssh connection: ssh user@host
    - Using IP addresses for connection
    - scp for file transfers
    - SSH key-based authentication (brief intro)

43. **Accessing Linux from Windows: MobaXterm**
    - What is MobaXterm
    - Downloading and installing MobaXterm
    - MobaXterm interface overview
    - Creating new SSH session
    - Step-by-step connection guide
    - Saving sessions
    - Using built-in SFTP browser
    - Terminal features

44. **File Transfer with WinSCP**
    - What is WinSCP
    - Downloading and installing WinSCP
    - WinSCP interface (Commander vs Explorer)
    - Connecting to Linux server
    - Uploading and downloading files
    - Editing remote files
    - Synchronization features
    - Best practices

### Section 13: Shell and Core Components (Posts 45)
45. **Understanding Linux Core Components**
    - The Linux Kernel
    - What is glibc (GNU C Library)
    - What is a shell (bash, zsh, sh)
    - systemd - system and service manager
    - Services and daemons
    - How components interact
    - Diagram: Linux architecture layers
    - The boot process overview

### Section 14: I/O Redirection and Piping (Posts 46-47)
46. **Mastering I/O Redirection**
    - Standard input (stdin) - file descriptor 0
    - Standard output (stdout) - file descriptor 1
    - Standard error (stderr) - file descriptor 2
    - > (redirect stdout, overwrite)
    - >> (redirect stdout, append)
    - < (redirect stdin)
    - 2> (redirect stderr)
    - &> (redirect both stdout and stderr)
    - 2>&1 (redirect stderr to stdout)
    - /dev/null for discarding output
    - Practical examples
    - Diagram: I/O redirection flow

47. **Using Pipes and tee Command**
    - What is a pipe |
    - Chaining commands with pipes
    - Examples: ls | grep, cat | sort | uniq
    - The tee command
    - tee for logging and display
    - tee -a for append
    - Complex pipeline examples
    - Real-world system administration pipelines

### Section 15: History and Completion (Posts 48-49)
48. **Working with Command History**
    - history command
    - Understanding HISTSIZE
    - history -c (clear)
    - history -w (write to file)
    - history -d (delete entry)
    - Ctrl-r for reverse search
    - !nn (execute command number)
    - !! (repeat last command)
    - !$ (last argument)
    - ~/.bash_history file
    - Why default is 1000 entries
    - Configuring history size

49. **Command Line Completion and bash-completion**
    - Tab completion basics
    - Pressing Tab once vs twice
    - Command name completion
    - File path completion
    - Variable name completion
    - Installing bash-completion package
    - Advanced completions for commands
    - Custom completion scripts

### Section 16: Variables and Bash Features (Posts 50-52)
50. **Understanding Shell Variables**
    - What is a variable
    - Creating variables: NAME=value
    - Reading variables: $NAME or ${NAME}
    - System variables vs user variables
    - Environment variables
    - Important variables: PATH, HOME, USER, SHELL
    - export for making variables available to child processes
    - env and printenv commands
    - Practical examples

51. **Using Aliases and Keyboard Shortcuts**
    - What are aliases
    - Creating aliases: alias name='command'
    - Viewing aliases: alias
    - Removing aliases: unalias
    - Making aliases permanent
    - Useful keyboard shortcuts:
      - Ctrl-l (clear screen)
      - Ctrl-u (delete line)
      - Ctrl-a (beginning of line)
      - Ctrl-e (end of line)
      - Ctrl-d (logout/EOF)
      - Ctrl-c (interrupt)
    - Practical workflow tips

52. **Bash Startup Files and Configuration**
    - Login vs non-login shells
    - /etc/environment (system-wide)
    - /etc/profile (login shells, all users)
    - /etc/profile.d/ (custom system scripts)
    - ~/.bash_profile (user login shell)
    - /etc/bashrc (non-login shells, all users)
    - ~/.bashrc (user non-login shell)
    - ~/.bash_logout (logout actions)
    - Order of execution
    - When to modify which file
    - Using source to reload configuration
    - Creating custom scripts in /etc/profile.d/
    - Best practices: system-wide vs per-user config

---

## Post Naming Convention
Format: `YYYY-MM-DD_lfcs-phase1-part-NN-topic-slug.mdx`

Example: `2025-11-04_lfcs-phase1-part-01-linux-operating-systems.mdx`

## Series Metadata
Add to each post:
```yaml
series: "LFCS Certification - Phase 1"
seriesOrder: [number]
```

## Practice Labs Structure
Each post with practice should include:
1. **Warm-up Tasks** (5 easy tasks)
2. **Core Practice** (10 intermediate tasks)
3. **Challenge Tasks** (5-10 advanced/real-world scenarios)
4. **Best Practices Section**
5. **Command Cheat Sheet**
6. **Common Pitfalls to Avoid**

---

## Notes
- Total posts: ~52 posts for Phase 1
- Each post: 2000-4000 words
- Include diagrams where mentioned
- Use HTML tables for tabular data
- Use template literals for code with curly braces
- Follow CLAUDE.md guidelines strictly
