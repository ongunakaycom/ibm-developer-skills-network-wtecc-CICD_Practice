document.addEventListener('DOMContentLoaded', function() {
  // Simulation state
  const startBtn = document.querySelector('#hero .btn-secondary');
  const terminalContent = document.getElementById('terminalContent');
  const startScreen = document.getElementById('startScreen');
  const simulationSection = document.getElementById('terminal');
  
  // Commands data - all strings translated to English
  const commands = [
    {
      command: 'git push origin main',
      output: 'Enumerating objects: 5 done\\nCounting objects: 100% (5/5), done.\\nWriting objects: 100% (5/5), done.\\nTotal 5 (delta 2), reused 0 (delta 0)\\nGit push OK'
    },
    {
      command: 'gh workflow run "CI workflow"',
      output: '✅ Workflow triggered!\\n⏳ Running on ubuntu-latest...\\n🐍 Python 3.9 environment setup\\n📦 Dependency install (pip)\\n🔧 Code Linting (flake8)\\n✅ Unit Testing & Coverage (pytest)\\n📊 CI Pass / Fail Status: PASSED\\nBuild & Test passed successfully!'
    },
    {
      command: 'docker build -t ghcr.io/user/cicd-practice:v1 .',
      output: 'Step 1: Base image layer...done.\\nStep 2: Install dependencies...done.\\nStep 3: Copy application...done.\\nStep 4: Multi-stage optimize...done.\\nSuccessfully built and pushed to GHCR.'
    },
    {
      command: 'kubectl apply -f labs/01_base_pipeline/',
      output: 'tasks.yaml created\\npipeline.yaml created\\nCustomResourceDefinition updates applied\\n✅ Pipeline resources created'
    },
    {
      command: 'kubectl get pipelineruns',
      output: 'NAME               STATUS   DURATION   STARTED AGE\\ncd-pipeline-run-xxxx   SUCCEEDED   2m30s   3m ago\\nPipeline run completed successfully!'
    }
  ];

  let currentCommand = 0;

  function typeText(element, text, speed = 15, onComplete) {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);
    
    return timer;
  }

  function addOutputLine(text, className = '') {
    const div = document.createElement('div');
    div.className = `output ${className}`;
    div.innerHTML = text.replace(/\n/g, '<br>');
    terminalContent.appendChild(div);
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }

  function addCommandLine(command) {
    const div = document.createElement('div');
    div.className = 'command';
    div.textContent = command;
    terminalContent.appendChild(div);
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }

  async function simulateCommand(cmd) {
    addCommandLine(cmd.command);
    
    const outputDiv = document.createElement('div');
    outputDiv.className = 'output success';
    outputDiv.innerHTML = cmd.output.replace(/\n/g, '<br>');
    terminalContent.appendChild(outputDiv);
    terminalContent.scrollTop = terminalContent.scrollHeight;
    
    // Wait for the typewriter to finish
    return new Promise(resolve => {
      setTimeout(resolve, (cmd.output.length * 15) + 300);
    });
  }

  async function runSimulation() {
    // Hide start screen, show terminal
    if (startScreen) {
      startScreen.style.display = 'none';
    }
    if (simulationSection) {
      simulationSection.style.display = 'block';
    }
    
    // Initial message
    addOutputLine('Starting DevOps Pipeline Simulation...');
    
    // Run each command sequentially
    for (let i = 0; i < commands.length; i++) {
      await simulateCommand(commands[i]);
      
      // Add small delay between commands
      if (i < commands.length - 1) {
        await new Promise(r => setTimeout(r, 500));
        addOutputLine(''); // empty line
      }
    }
    
    // Add final success badge
    const badgeDiv = document.createElement('div');
    badgeDiv.style.marginTop = '1rem';
    badgeDiv.style.padding = '0.5rem 1rem';
    badgeDiv.style.background = 'rgba(0, 212, 170, 0.15)';
    badgeDiv.style.border = '1px solid var(--accent)';
    badgeDiv.style.borderRadius = '20px';
    badgeDiv.style.display = 'inline-flex';
    badgeDiv.style.alignItems = 'center';
    badgeDiv.style.gap = '0.5rem';
    badgeDiv.innerHTML = '<span style="color: var(--success);">✓</span> Pipeline Status: <strong style="color: var(--success);">SUCCESS</strong>';
    terminalContent.appendChild(badgeDiv);
    
    // Re-enable start button after delay
    setTimeout(() => {
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = 'Run Simulation';
      }
    }, 1000);
  }

  // Button click handler
  if (startBtn) {
    startBtn.addEventListener('click', runSimulation);
  }
});